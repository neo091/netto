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

-- 4. FUNCIÓN DE AUTOMATIZACIÓN (TRIGGER)
-- Crea un perfil automáticamente cuando alguien se registra en la App
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, user_name, updated_at)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Conductor'), 
    NEW.email, 
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Disparador del Trigger
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

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

-- 6. DATOS DE PRUEBA (OPCIONAL - ELIMINAR PARA PRODUCCIÓN)
/*
DO $$ 
DECLARE 
    uid UUID := (SELECT id FROM auth.users LIMIT 1); -- Toma el primer usuario que encuentre
    i INTEGER;
BEGIN
    IF uid IS NOT NULL THEN
        FOR i IN 1..50 LOOP
            INSERT INTO history (user_id, amount, paymethod, created_at)
            VALUES (
                uid, 
                (random() * 40 + 10)::numeric(10,2), 
                CASE WHEN random() < 0.5 THEN 'tarjeta' ELSE 'efectivo' END,
                now() - (random() * interval '30 days')
            );
        END LOOP;
    END IF;
END $$;
*/