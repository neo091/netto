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

  const [customRange, setCustomRange] = useState({ start: null, end: null });
  const [onError, setOnError] = useState(null);
  const [onSuccess, setOnSuccess] = useState(null);

  // Lógica de fechas estricta
  const startDate =
    filter === "range" ? customRange.start : getDateRange(filter);
  const endDate = filter === "range" ? customRange.end : null;

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["history", user?.id, filter, startDate, endDate],
    queryFn: ({ pageParam = 0 }) => {
      if (!user?.id) throw new Error("No user");
      return historyApi.getHistory(
        user.id,
        pageParam,
        itemsPerPage,
        startDate,
        endDate,
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
  const stats = data?.pages[0]?.stats || {
    totalBruto: 0,
    totalTarjeta: 0,
    totalEfectivo: 0,
    gananciaNeta: 0,
    diferenciaEfectivo: 0,
  };
  const totalCount = data?.pages[0]?.count || 0;

  const deleteMutation = useMutation({
    mutationFn: (tripId) => historyApi.deleteHistory(tripId, user.id),
    onMutate: async (tripId) => {
      setOnError(null);
      setOnSuccess(null);
      await queryClient.cancelQueries(["history", user?.id, startDate]);

      const previousData = queryClient.getQueryData([
        "history",
        user?.id,
        startDate,
      ]);

      queryClient.setQueryData(["history", user?.id, startDate], (old) => {
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
          ["history", user?.id, startDate],
          context.previousData,
        );
      }

      console.log(err);
      setOnError("error al eliminar el registro");
    },
    onSuccess: () => {
      setOnSuccess("eliminado correctamente!");
      refetch();
    },
  });

  return {
    historyList,
    stats,
    totalCount,
    loading: isLoading,

    setRange: (formattedStart, formattedEnd) =>
      setCustomRange({ start: formattedStart, end: formattedEnd }),

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    prevPage: () => setPage((p) => p - 1),
    nextPage: () => setPage((p) => p + 1),
    goPage: (newPage) => setPage(newPage),

    filter,
    changeFilter: (newFilter) => setFilter(newFilter),

    handleDelete: (tripId) => deleteMutation.mutate(tripId),
    onError,
    onSuccess,
  };
};
