import { useState } from "react"
import { getDateRange } from "../lib/util"
import Swal from "sweetalert2"
import * as historyApi from "../lib/api"
import { useConfig } from "../context/config/useConfig"
import { useAuth } from "../context/auth/useAuth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useHistory = () => {
  const queryClient = useQueryClient()

  const { user } = useAuth()
  const { percentage } = useConfig()

  const itemsPerPage = 10

  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState("today") // "all", "today", "week", "month"

  const dateLimit = getDateRange(filter)

  const { data, isLoading } = useQuery({
    queryKey: ["history", user?.id, page, filter],
    queryFn: () => {
      if (!user?.id) throw new Error("No user")
      return historyApi.getHistory(
        user.id,
        page,
        itemsPerPage,
        dateLimit,
        percentage
      )
    },
    enabled: !!user?.id,
    keepPreviousData: true,
  })

  const deleteMutation = useMutation({
    mutationFn: (tripId) => historyApi.deleteHistory(tripId, user.id),
    onMutate: async (tripId) => {
      await queryClient.cancelQueries(["history"])

      const previousData = queryClient.getQueriesData([
        "history",
        user?.id,
        page,
        filter
      ])

      queryClient.setQueryData(
        ["history", user?.id, page, filter],
        (old) => ({
          ...old,
          list: old.list.filter((item) => item.id !== tripId)
        })
      )

      return { previousData }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["history", user?.id, page, filter],
        context.previousData
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries(["history"])
    }
  })


  const handleDelete = async (tripId) => {

    const result = await Swal.fire({
      title: "¿Eliminar registro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#374151",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    })

    if (!result.isConfirmed) return

    deleteMutation.mutate(tripId)

    toast.success("eliminado correctamente!")

  }

  const changeFilter = (id) => {
    setPage(0)
    setFilter(id)
  }

  return {
    historyList: data?.list || {},
    stats: data?.stats || {},
    totalCount: data?.count || 0,
    loading: isLoading,

    page,
    setPage,
    totalPages: Math.ceil((data?.count || 0) / itemsPerPage),

    prevPage: () => { setPage((p) => p - 1) },
    nextPage: () => { setPage((p) => p + 1) },

    filter,
    changeFilter,

    handleDelete
  }
}