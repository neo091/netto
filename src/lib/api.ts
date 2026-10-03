import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "./supabase";

/**
 * Obtiene los registros de actividad y calcula las métricas de liquidación.
 * @param userId - ID del conductor
 * @param page - Página actual
 * @param itemsPerPage - Cantidad de registros por página
 * @param dateLimit - ISO String para filtrar desde una fecha específica
 * @param percentage - Porcentaje de ganancia neta (default 40%)
 * @param startDate - Fecha de inicio del filtro
 * @param endDate - Fecha de fin del filtro
 */

export const getHistory = async (
  userId: string,
  page: number,
  itemsPerPage: number,
  startDate: string | null,
  endDate: string | null,
  percentage: number,
) => {
  const from = page * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("history")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (startDate) query = query.gte("created_at", startDate);
  if (endDate) query = query.lte("created_at", endDate);

  const [resList, statsRes] = await Promise.all([
    query,
    supabase
      .rpc("get_history_stats", {
        user_id_param: userId,
        start_date_param: startDate,
        end_date_param: endDate,
        percentage_param: percentage,
      })
      .single(),
  ]);

  if (resList.error) throw resList.error;
  if (statsRes.error && statsRes.error.code !== "PGRST116")
    throw statsRes.error;

  return {
    list: resList.data || [],
    count: resList.count || 0,
    stats: statsRes.data ?? {
      totalBruto: 0,
      totalTarjeta: 0,
      totalEfectivo: 0,
      gananciaNeta: 0,
      diferenciaEfectivo: 0,
    },
  };
};

export const deleteHistory = async (recordId: string, userId: string) => {
  const { error } = await supabase
    .from("history")
    .delete()
    .eq("id", recordId)
    .eq("user_id", userId);
  if (error) throw error;
};

export const sendFeedback = async ({
  feedback,
}: {
  feedback: string;
}): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> => {
  try {
    const { data, error } = await supabase.functions.invoke("send-feedback", {
      body: {
        feedback: feedback.trim(),
      },
    });

    if (error) {
      let message = "No se pudo enviar la sugerencia.";

      // Recuperamos el mensaje que devuelve el servidor.
      if (error instanceof FunctionsHttpError) {
        const body = await error.context.json().catch(() => null);

        if (typeof body?.error === "string") {
          message = body.error;
        } else if (error.context.status === 401) {
          message = "Tu sesión no es válida. Vuelve a iniciar sesión.";
        }
      }

      return {
        success: false,
        error: message,
      };
    }

    if (data?.success !== true) {
      return {
        success: false,
        error: "El servidor no confirmó el envío.",
      };
    }

    return {
      success: true,
      message: "Sugerencia enviada correctamente.",
    };
  } catch {
    return {
      success: false,
      error: "No se pudo conectar. Inténtalo de nuevo.",
    };
  }
};

export const fetchUserProfile = async (user: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("first_name")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error trayendo perfil:", error.message);
    return { id: user.id };
  }

  return {
    id: user.id,
    ...data,
  };
};
