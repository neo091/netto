
const FILTERS = [
  { id: "today", label: "Hoy" },
  { id: "week", label: "Semana" },
  { id: "month", label: "Mes" },
  { id: "all", label: "Todo" },
];
function FilterSection({ onChange, filter }) {

  return (
    <section className="flex gap-2 overflow-x-auto bg-gray-900 max-w-md mx-auto w-full py-2">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          onClick={() => {
            onChange(f.id)
          }}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${filter === f.id
            ? "bg-green-500 text-black"
            : "bg-gray-800 text-gray-400 border border-gray-700"
            }`}
        >
          {f.label}
        </button>
      ))}
    </section>
  )
}

export default FilterSection