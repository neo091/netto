import { ReactNode } from "react";

interface FunctionProps {
  status: string;
  icon: ReactNode;
  title: string;
  desc: string;
}

const Function = ({ status, icon, title, desc }: FunctionProps) => {
  return (
    <div
      className={`group p-5 rounded-3xl border transition-all duration-300 ${
        status !== "Próximamente"
          ? "bg-gray-800/40 border-gray-700 hover:border-emerald-500/50 hover:bg-gray-800/60"
          : "bg-gray-800/10 border-gray-800 opacity-50 cursor-not-allowed"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-900 rounded-2xl group-hover:scale-105 transition-transform border border-gray-700 shadow-inner">
          {icon}
        </div>
        <span
          className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${
            status === "Activo"
              ? "bg-emerald-500/10 text-emerald-500"
              : "bg-gray-700 text-gray-500"
          }`}
        >
          {status}
        </span>
      </div>

      <h2 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">
        {title}
      </h2>
      <p className="text-xs text-gray-500 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
};
export default Function;
