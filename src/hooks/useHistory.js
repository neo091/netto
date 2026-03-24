import { toast } from "sonner";
import Swal from "sweetalert2";
import { useState } from "react";
import * as historyApi from "../lib/api";
import { getDateRange } from "../lib/util";
import { useAuth } from "../context/auth/useAuth";
import { useConfig } from "../context/config/useConfig";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useHistory = () => {
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const { percentage } = useConfig();

  const itemsPerPage = 5;

  const [filter, setFilter] = useState("today"); // "all", "today", "week", "month"

  const dateLimit = getDateRange(filter);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["history", user?.id, dateLimit],
    queryFn: ({ pageParam = 0 }) => {
      if (!user?.id) throw new Error("No user");
      return historyApi.getHistory(
        user.id,
        pageParam,
        itemsPerPage,
        dateLimit,
        percentage,
      );
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.length * itemsPerPage;

      if (totalLoaded >= lastPage.count) {
        return undefined;
      }
      return allPages.length;
    },
    enabled: !!user?.id,
  });

  const historyList = data?.pages.flatMap((page) => page.list) ?? [];
  const stats = data?.pages[0]?.stats || {};
  const totalCount = data?.pages[0]?.count || 0;

  const deleteMutation = useMutation({
    mutationFn: (tripId) => historyApi.deleteHistory(tripId, user.id),
    onMutate: async (tripId) => {
      await queryClient.cancelQueries(["history", user?.id, dateLimit]);

      const previousData = queryClient.getQueryData([
        "history",
        user?.id,
        dateLimit,
      ]);

      queryClient.setQueryData(["history", user?.id, dateLimit], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            list: page.list.filter((item) => item.id !== tripId),
            count: page.count - 1,
          })),
        };
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["history", user?.id, dateLimit],
          context.previousData,
        );
      }
      toast.error("error al eliminar el registro");
    },
    onSuccess: () => {
      toast.success("eliminado correctamente!");
      refetch();
    },
  });

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
    });

    if (!result.isConfirmed) return;

    deleteMutation.mutate(tripId);
  };

  const changeFilter = (newFilter) => setFilter(newFilter);

  return {
    historyList,
    stats,
    totalCount,
    loading: isLoading,

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    prevPage: () => setPage((p) => p - 1),
    nextPage: () => setPage((p) => p + 1),
    goPage: (newPage) => setPage(newPage),

    filter,
    changeFilter,

    handleDelete,
  };
};
