-- ==========================================
-- NETTO: CONFIGURACIÓN COMPLETA DE SUPABASE
-- ==========================================

-- 1. TABLA DE PERFILES (PROFILES)
-- Guarda la información del conductor vinculada a Auth
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,
  first_name text NULL,
  user_name text NULL,
  avatar_url text NULL,
  updated_at timestamp with time zone NULL,
  is_test boolean NULL DEFAULT false,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_user_name_key UNIQUE (user_name),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- 2. TABLA DE HISTORIAL (HISTORY)
-- Guarda cada viaje registrado por el taxista
CREATE TABLE IF NOT EXISTS public.history (
  id uuid NOT NULL DEFAULT gen_random_uuid (),
  user_id uuid NOT NULL DEFAULT auth.uid (),
  amount numeric NULL,
  duration text NULL,
  paymethod text NULL, -- Sugerido: 'tarjeta' o 'efectivo'
  created_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT history_pkey PRIMARY KEY (id),
  CONSTRAINT history_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- 3. SEGURIDAD DE FILAS (RLS)
-- Asegura que un taxista no pueda ver los datos de otro
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

-- Políticas para Profiles
CREATE POLICY "Los usuarios pueden ver su propio perfil" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Los usuarios pueden actualizar su propio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para History
CREATE POLICY "Los usuarios pueden ver su propio historial" ON public.history
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Los usuarios pueden insertar en su propio historial" ON public.history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Los usuarios pueden borrar su propio historial" ON public.history
  FOR DELETE USING (auth.uid() = user_id);

-- 4. CREACIÓN AUTOMÁTICA DEL PERFIL
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  initial_name text;
BEGIN
  initial_name := COALESCE(
    NULLIF(btrim(NEW.raw_user_meta_data ->> 'display_name'), ''),
    NULLIF(btrim(NEW.raw_user_meta_data ->> 'first_name'), ''),
    NULLIF(split_part(NEW.email, '@', 1), ''),
    'Conductor'
  );

  INSERT INTO public.profiles (
    id,
    first_name,
    user_name,
    updated_at
  )
  VALUES (
    NEW.id,
    initial_name,
    NEW.email,
    now()
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- 4.1. SINCRONIZACIÓN DEL NOMBRE EDITABLE
CREATE OR REPLACE FUNCTION public.sync_user_display_name()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  chosen_name text;
BEGIN
  chosen_name := btrim(
    NEW.raw_user_meta_data ->> 'display_name'
  );

  IF chosen_name IS NULL OR chosen_name = '' THEN
    RETURN NEW;
  END IF;

  IF char_length(chosen_name) > 80 THEN
    RAISE EXCEPTION 'El nombre no puede superar los 80 caracteres';
  END IF;

  UPDATE public.profiles
  SET
    first_name = chosen_name,
    updated_at = now()
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_display_name_updated
ON auth.users;

CREATE TRIGGER on_auth_user_display_name_updated
AFTER UPDATE OF raw_user_meta_data ON auth.users
FOR EACH ROW
WHEN (
  (OLD.raw_user_meta_data ->> 'display_name')
  IS DISTINCT FROM
  (NEW.raw_user_meta_data ->> 'display_name')
)
EXECUTE FUNCTION public.sync_user_display_name();

-- 5. FUNCIÓN DE CÁLCULO DE ESTADÍSTICAS (GET_HISTORY_STATS)
-- El "cerebro" contable de Netto
CREATE OR REPLACE FUNCTION get_history_stats(
  user_id_param UUID,
  start_date_param TEXT DEFAULT NULL,
  end_date_param TEXT DEFAULT NULL,
  percentage_param NUMERIC DEFAULT 40
)
RETURNS TABLE (
  "totalBruto" NUMERIC,
  "totalTarjeta" NUMERIC,
  "totalEfectivo" NUMERIC,
  "gananciaNeta" NUMERIC,
  "diferenciaEfectivo" NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(amount), 0) as "totalBruto",
    COALESCE(SUM(CASE WHEN lower(paymethod) IN ('tarjeta', 'card') THEN amount ELSE 0 END), 0) as "totalTarjeta",
    COALESCE(SUM(CASE WHEN lower(paymethod) IN ('efectivo', 'cash') THEN amount ELSE 0 END), 0) as "totalEfectivo",
    COALESCE(SUM(amount * (percentage_param / 100.0)), 0) as "gananciaNeta",
    COALESCE(
      SUM(amount * (percentage_param / 100.0)) - 
      SUM(CASE WHEN lower(paymethod) IN ('efectivo', 'cash') THEN amount ELSE 0 END), 
      0
    ) as "diferenciaEfectivo"
  FROM history
  WHERE user_id = user_id_param
    AND (start_date_param IS NULL OR created_at >= start_date_param::TIMESTAMP)
    AND (end_date_param IS NULL OR created_at <= end_date_param::TIMESTAMP);
END;
$$ LANGUAGE plpgsql;
