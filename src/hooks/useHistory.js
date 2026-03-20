import { useEffect, useState } from "react"
import { getDateRange } from "../lib/util"
import Swal from "sweetalert2"
import { deleteHistoryRecord, fetchHistoryData } from "../lib/api"
import { useConfig } from "../context/config/useConfig"
import { useAuth } from "../context/auth/useAuth"

export const useHistory = () => {

  const [historyList, setHistoryList] = useState([])
  const [loading, setLoading] = useState(true)


  const [page, setPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  const itemsPerPage = 10

  const { user } = useAuth()
  const { percentage } = useConfig()

  const [filter, setFilter] = useState("today") // "all", "today", "week", "month"

  const [stats, setStats] = useState({
    totalBruto: 0,
    totalTarjeta: 0,
    totalEfectivo: 0,
    gananciaNeta: 0,
    diferenciaEfectivo: 0,
  })

  const loadHistory = async () => {
    setLoading(true)
    try {
      const dateLimit = getDateRange(filter)

      const result = await fetchHistoryData(
        user.id,
        page,
        itemsPerPage,
        dateLimit,
        percentage
      )

      setHistoryList(result.history)
      setTotalCount(result.count)
      setStats(result.stats)
    } catch (error) {
      console.log(error)
      Swal.fire("Error", "No se pudo cargando historial", "error")
    } finally {
      setLoading(false)
    }
  }
  const changeFilter = (id) => {
    setPage(0)
    setFilter(id)
  }

  const handleDelete = (tripId) => {
    Swal.fire({
      title: "¿Eliminar registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#374151",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteHistoryRecord(tripId, user.id)
          loadHistory()

          Swal.fire({
            title: "Borrado",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          })
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el registro", "error")
        }
      }
    })
  }

  const prevPage = () => { setPage((p) => p - 1) }
  const nextPage = () => { setPage((p) => p + 1) }

  useEffect(() => {
    loadHistory()
  }, [user.id, page, filter, itemsPerPage])

  const totalPages = Math.ceil(totalCount / itemsPerPage)


  return { prevPage, nextPage, changeFilter, stats, filter, setFilter, historyList, loading, handleDelete, totalCount, itemsPerPage, setPage, page, totalPages }
}