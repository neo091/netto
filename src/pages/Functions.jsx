import { Link } from "react-router-dom";
import {
  IconChevronLeft,
  IconClock,
  IconChart,
  IconCog,
  IconDelete,
  IconsTrash,
  IconWhatsapp,
} from "../assets/Icons"; // Asegúrate de que la ruta sea correcta

const functions = [
  {
    title: "Calculadora de Liquidación",
    desc: "Cálculo instantáneo basado en tu comisión personalizada (40% por defecto).",
    icon: <IconClock size={6} className="text-emerald-500" />,
    path: "/",
    status: "Activo",
  },
  {
    title: "Historial de Viajes",
    desc: "Control total de lo recaudado con filtros por fechas inteligentes.",
    icon: <IconsTrash />, // Representa la gestión/limpieza de registros
    path: "/history",
    status: "Activo",
  },
  {
    title: "Configuración Avanzada",
    desc: "Ajusta tu moneda, número de WhatsApp y balance de conductor.",
    icon: <IconCog size={6} className="text-gray-400" />,
    path: "/config",
    status: "Configurable",
  },
  {
    title: "Métricas de Rendimiento",
    desc: "Visualiza tus ganancias netas mediante gráficos de barras.",
    icon: <IconChart size={6} className="text-blue-400" />,
    path: "#",
    status: "Próximamente",
  }
];

const Functions = () => {
  return (
    <main className="bg-gray-900 min-h-screen text-white p-6 pb-24 font-sans">
      {/* Header con efecto Blur */}
      <div className="flex items-center gap-4 mb-10 sticky top-0 bg-gray-900/80 backdrop-blur-md py-4 z-10">
        <Link
          to="/"
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
        >
          <IconChevronLeft />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Funciones Netto</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
        {functions.map((func, index) => (
          <Link
            key={index}
            to={func.path}
            className={`group p-5 rounded-3xl border transition-all duration-300 ${func.status !== "Próximamente"
              ? "bg-gray-800/40 border-gray-700 hover:border-emerald-500/50 hover:bg-gray-800/60"
              : "bg-gray-800/10 border-gray-800 opacity-50 cursor-not-allowed"
              }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-900 rounded-2xl group-hover:scale-105 transition-transform border border-gray-700 shadow-inner">
                {func.icon}
              </div>
              <span
                className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${func.status === "Activo"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-gray-700 text-gray-500"
                  }`}
              >
                {func.status}
              </span>
            </div>

            <h2 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors">
              {func.title}
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              {func.desc}
            </p>
          </Link>
        ))}


      </div>
      {/* Banner de Integridad de Datos (Usando IconDelete como escudo) */}
      <div className="mt-8 p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4 max-w-md m-auto">
        <div className="text-emerald-500 opacity-40">
          <IconDelete />
        </div>
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-1">
            Privacidad
          </h3>
          <p className="text-[11px] text-gray-500 font-medium">
            Tus datos se almacenan de forma local y segura. Netto no comparte
            tu información financiera.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Functions;
