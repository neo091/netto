import { IconsTrash } from "../assets/Icons";
import { useConfig } from "../context/config/useConfig";

export type HistoryItemType = {
  created_at: string;
  amount: string;
  paymethod: string;
  duration: string;
  id: string;
};

interface HistoryItemProps {
  item: HistoryItemType;
  onDelete: (id: string) => void;
  currency: string;
}

function HistoryItem({ item, onDelete, currency }: HistoryItemProps) {
  return (
    <>
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg flex overflow-hidden hover:border-green-500/50 transition-colors">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <p className="text-2xl font-black text-white">
              {item.amount}
              <span className="text-green-400 text-lg">{currency}</span>
            </p>
            <span
              className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${item.paymethod === "CASH" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}
            >
              {item.paymethod}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            ⏱️ {item.duration} •{" "}
            {new Date(item.created_at).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
            })}
          </p>
        </div>
        <button
          onClick={() => onDelete(item.id)}
          className="bg-gray-700/30 hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all px-4 flex items-center"
        >
          <IconsTrash />
        </button>
      </div>
    </>
  );
}

export default HistoryItem;
