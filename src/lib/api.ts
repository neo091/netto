import { HistoryItemType } from "../components/HistoryItem"
import { supabase } from "./supabase"

/**
 * Obtiene los registros de actividad y calcula las métricas de liquidación.
 * @param userId - ID del conductor
 * @param page - Página actual
 * @param itemsPerPage - Cantidad de registros por página
 * @param dateLimit - ISO String para filtrar desde una fecha específica
 * @param percentage - Porcentaje de ganancia neta (default 40%)
 */

export const fetchHistoryData = async (
  userId: string,
  page: number,
  itemsPerPage: number,
  dateLimit: string | null,
  percentage: number = 40,
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

  const [resList, resTotal] = await Promise.all([query, totalQuery])

  if (resList.error) throw resList.error
  if (resTotal.error) throw resTotal.error

  const data = resTotal.data || []

  const bruto = data.reduce(
    (acc: number, item: HistoryItemType) => acc + (parseFloat(item.amount) || 0),
    0,
  )

  const tarjeta = data
    .filter((i: HistoryItemType) => i.paymethod === "CARD")
    .reduce((acc: number, item: HistoryItemType) => acc + (parseFloat(item.amount) || 0), 0)

  const efectivo = data
    .filter((i: HistoryItemType) => i.paymethod === "CASH")
    .reduce((acc: number, item: HistoryItemType) => acc + (parseFloat(item.amount) || 0), 0)

  const gananciaNeta = (bruto * percentage) / 100
  const diferenciaEfectivo = gananciaNeta - efectivo

  return {
    history: resList.data,
    count: resList.count,
    stats: {
      totalBruto: bruto,
      totalTarjeta: tarjeta,
      totalEfectivo: efectivo,
      gananciaNeta,
      diferenciaEfectivo,
    },
  }
}

export const deleteHistoryRecord = async (recordId: string, userId: string) => {
  const { error } = await supabase
    .from("history")
    .delete()
    .eq("id", recordId)
    .eq("user_id", userId)
  if (error) throw error
}

export const sendFeedback = async ({ feedback }: { feedback: string }) => {
  try {
    const response = await fetch("https://vps22397.cubepath.net/webhook-test/9b7ccb43-b6ae-469a-b895-a8d364275e7f", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: feedback,
        user: "Usuario Beta", // Aquí podrías pasar el email si ya lo tienes
        page: window.location.pathname,
        timestamp: new Date().toLocaleString()
      }),
    })

    if (response.ok) {
      return { message: "feedback send!" }
    } else {
      throw Error("error al enviar feedback")
    }


  } catch (error) {
    console.log(error)
  }
}
