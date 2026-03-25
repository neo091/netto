import React, { useState } from "react";

interface DateRangePickerProps {
  onFilter: (
    formattedStart: string | null,
    formattedEnd: string | null,
  ) => void;
}

const DateRangePicker = ({ onFilter }: DateRangePickerProps) => {
  const [dates, setDates] = useState({ start: "", end: "" });

  const handleApply = () => {
    // Normalizamos las horas para capturar el día completo
    const formattedStart = dates.start ? `${dates.start}T00:00:00` : null;
    const formattedEnd = dates.end ? `${dates.end}T23:59:59` : null;

    onFilter(formattedStart, formattedEnd);
  };

  return (
    <div className="bg-slate-700 border border-white/20 p-6 rounded-3xl shadow-xl text-white max-w-sm mx-auto">
      <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
        <span>📅</span> Filtrar por Rango
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 ml-1">
            Desde
          </label>
          <input
            type="date"
            className="w-full bg-black/40 border border-emerald-500/30 rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors text-white scheme-dark"
            onChange={(e) => setDates({ ...dates, start: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 ml-1">
            Hasta
          </label>
          <input
            type="date"
            className="w-full bg-black/40 border border-emerald-500/30 rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors text-white scheme-dark"
            onChange={(e) => setDates({ ...dates, end: e.target.value })}
          />
        </div>

        <button
          onClick={handleApply}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-xl mt-2 transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
        >
          Aplicar Filtro
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
