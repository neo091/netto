import { AnimatePresence, motion } from "framer-motion";
import { HistoryItemType } from "../types/history";
import HistoryItem from "./HistoryItem";

interface HistoriListProps {
  historyList: HistoryItemType[];
  handleDelete: (id: string) => void;
  currency: string;
}

function HistoryList({
  historyList,
  handleDelete,
  currency,
}: HistoriListProps) {
  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {historyList.map((h: HistoryItemType) => (
          <motion.div
            key={h.id}
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: 100,
              transition: { duration: 0.2 },
            }}
          >
            <HistoryItem item={h} currency={currency} onDelete={handleDelete} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default HistoryList;
