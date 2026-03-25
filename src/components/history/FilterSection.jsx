import { useEffect, useState } from "react";
import DateRangePicker from "../DateRangePicker";

const FILTERS = [
  { id: "today", label: "Hoy" },
  { id: "week", label: "Semana" },
  { id: "month", label: "Mes" },
  { id: "all", label: "Todo" },
  { id: "range", label: "Rango" },
];
function FilterSection({ onChange, filter, onRangeChange, customRange }) {
  // Estado local para mostrar/ocultar el modal flotante
  const [showPicker, setShowPicker] = useState(false);

  // Si el usuario cambia a otro filtro (Hoy, Semana), cerramos el picker por si estaba abierto
  useEffect(() => {
    if (filter !== "range") setShowPicker(false);
  }, [filter]);

  const handleApplyRange = (start, end) => {
    onRangeChange(start, end); // Guarda las fechas en el hook
    setShowPicker(false);
  };

  return (
    <section className="relative max-w-md mx-auto w-full bg-gray-900 px-2 py-2">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              onChange(f.id);
              if (f.id === "range") setShowPicker(!showPicker);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              filter === f.id
                ? "bg-green-500 text-black"
                : "bg-gray-800 text-gray-400 border border-gray-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Modal flotante posicionado absolutamente */}
      {showPicker && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 px-2 animate-in fade-in zoom-in-95 duration-200">
          {/* El DateRangePicker ahora flotará sobre el contenido de abajo */}
          <DateRangePicker onFilter={handleApplyRange} />
          {/* Opcional: Un overlay invisible para cerrar si toca fuera */}
          <div
            className="fixed inset-0 -z-10"
            onClick={() => setShowPicker(false)}
          />
        </div>
      )}
    </section>
  );
}

export default FilterSection;
