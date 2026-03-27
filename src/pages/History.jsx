import FilterSection from "../components/history/FilterSection";
import SummarySection from "../components/history/SummarySection";
import { useHistory } from "../hooks/useHistory";
import { useConfig } from "../context/config/useConfig";
import HistoryHeader from "../components/history/HistoryHeader";
import HistoryContent from "../components/history/HistoryContent";
import LoadMoreTrigger from "../components/history/LoadMoreTrigger";
import HeaderBlur from "../components/ui/HeaderBlur";
import { useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const History = () => {
  const { currency } = useConfig();

  const history = useHistory();

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

    history.handleDelete(tripId);
  };

  useEffect(() => {
    if (history.onError) toast.error(history.onError);
    if (history.onSuccess) toast.error(history.onSuccess);
  }, [history.onError, history.onSuccess]);

  return (
    <>
      <main className="bg-gray-900 min-h-screen text-white p-6 pb-24 fade-in flex flex-col">
        <HeaderBlur label="Historial" />
        <div className="flex-1 flex flex-col gap-2 py-2">
          <SummarySection stats={history.stats} filter={history.filter} />
          <HistoryHeader
            filter={history.filter}
            historyList={history.historyList}
          />
          <FilterSection
            onChange={history.changeFilter}
            filter={history.filter}
            onRangeChange={history.setRange}
            customRange={history.customRange}
          />
          <HistoryContent
            currency={currency}
            handleDelete={handleDelete}
            historyList={history.historyList}
            loading={history.loading}
          />
          <LoadMoreTrigger
            fetchNextPage={history.fetchNextPage}
            hasNextPage={history.hasNextPage}
          />

          {history.isFetchingNextPage && <p>Cargando más...</p>}
          {/*<HistoryPagination {...history} />*/}
        </div>
        {/*<Footer />*/}
      </main>
    </>
  );
};

export default History;
