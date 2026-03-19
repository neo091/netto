import StatItem from "../StatItem";

const STATS_DATA = [
  {
    id: 1,
    value: "%",
    label: "Ganancia Automática",
    color: "text-green-500",
  },
  {
    id: 2,
    value: "0.00",
    label: "Errores de caja",
  },
  {
    id: 3,
    value: "WA",
    label: "Reportes Integrados",
  },
  {
    id: 4,
    value: "SEC",
    label: "Datos en la nube",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-gray-900 border-y border-gray-800">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-12">
          Control total de tus ganancias
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS_DATA.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              label={stat.label}
              valueColor={stat.color}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;