import { IconChart, IconClock, IconCog, IconsTrash } from "../../assets/Icons";
import Function from "./Function";

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
  },
];

const FunctionsSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
      {functions.map((func, index) => (
        <Function {...func} key={index} />
      ))}
    </section>
  );
};
export default FunctionsSection;
