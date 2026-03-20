import { N8N_API_BASE } from "./env"
import { supabase } from "./supabase"


/**
 * Obtiene los registros de actividad y calcula las métricas de liquidación.
 * @param userId - ID del conductor
 * @param page - Página actual
 * @param itemsPerPage - Cantidad de registros por página
 * @param dateLimit - ISO String para filtrar desde una fecha específica
 * @param percentage - Porcentaje de ganancia neta (default 40%)
 */


export const getHistory = async (
  userId: string,
  page: number,
  itemsPerPage: number,
  dateLimit: string | null,
  percentage: number
) => {
  const from = page * itemsPerPage
  const to = from + itemsPerPage - 1

  let query = supabase
    .from("history")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to)

  if (dateLimit) query = query.gte("created_at", dateLimit)

  let totalQuery = supabase
    .from("history")
    .select("*")
    .eq("user_id", userId)

  if (dateLimit) totalQuery = totalQuery.gte("created_at", dateLimit)

  const [resList, statsRes] = await Promise.all([query, supabase.rpc("get_history_stats", {
    user_id_param: userId,
    date_limit_param: dateLimit,
    percentage_param: percentage,
  })])

  if (resList.error) throw resList.error
  if (statsRes.error) throw statsRes.error

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
  }
}

export const deleteHistory = async (recordId: string, userId: string) => {
  const { error } = await supabase
    .from("history")
    .delete()
    .eq("id", recordId)
    .eq("user_id", userId)
  if (error) throw error
}

export const sendFeedback = async ({ feedback }: { feedback: string }) => {
  const cleanFeedback = feedback
    .replace(/<[^>]*>?/gm, '')
    .trim();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(`${N8N_API_BASE}/webhook/aae9cdbd-3b51-4e4c-95d0-5ef814b38796`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        feedback: cleanFeedback,
        name: "Usuario Beta",
        timestamp: new Date().toISOString(),
        //metadata: {
        //  user: "Usuario Beta",
        //  page: window.location.pathname,
        //  timestamp: new Date().toISOString(),
        //  browser: navigator.userAgent.split(') ')[1]
        //}
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {

      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    return { success: true, message: "feedback send!" };

  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.error("Feedback error: Timeout excedido");
      return { success: false, error: "El servidor tardó demasiado en responder." };
    }

    console.error("Feedback error:", error.message);
    return { success: false, error: "No se pudo enviar el feedback." };
  }
};
