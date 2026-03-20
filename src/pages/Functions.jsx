import { Link } from "react-router-dom";
import {
  IconChevronLeft,
  IconClock,
  IconChart,
  IconCog,
  IconDelete,
  IconsTrash,
  IconWhatsapp,
  IconAlert,
} from "../assets/Icons"; // Asegúrate de que la ruta sea correcta
import { useState } from "react";
import { sendFeedback } from "../lib/api";
import { toast } from "sonner";

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

  const [feedback, setFeedback] = useState("")
  const [status, setStatus] = useState("idle")
  const [honeypot, setHoneypot] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (honeypot) return;
    if (!feedback.trim()) return;

    if (feedback.trim().length < 10) {
      toast.error("Por favor, describe un poco más tu sugerencia.", {
        description: "(mínimo 10 caracteres).",
        style: { background: '#111827', color: '#FFFFFF', border: '1px solid #10b981' },
        classNames: {
          description: "text-red-500"
        }
      });
      return;
    }

    if (feedback.trim().length > 150) {
      toast.error("Por favor, describe un poco más tu sugerencia.", {
        description: "(máximo 150 caracteres).",
        style: { background: '#111827', color: '#FFFFFF', border: '1px solid #10b981' },
        classNames: {
          description: "text-red-500"
        }
      });
      return;
    }

    setStatus("sending")

    const response = await sendFeedback({ feedback })

    if (response.message) {
      setStatus("success")
      setFeedback("")
      toast.success("feedback enviado!", {
        style: { background: '#111827', color: '#FFFFFF', border: '1px solid #10b981' },
      })
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      console.log("error al enviar")
      setStatus("error")
      setFeedback("")
      toast.error("feedback no enviado!", {
        style: { background: '#111827', color: '#FFFFFF', border: '1px solid #10b981' },
      })
      setTimeout(() => setStatus('idle'), 3000);
    }
  }


  return (
    <main className="bg-gray-900 min-h-screen text-white p-6 pb-24 font-sans fade-in ">
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
          <div
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
          </div>
        ))}


      </div>

      <div className="mt-8">
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-3xl max-w-md m-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <IconAlert className="text-emerald-500" />
            </div>
            <h3 className="font-bold text-lg">¿Qué función te gustaría que agreguemos?</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <textarea
                minLength={10}
                maxLength={150}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Ej: Me gustaría ver un gráfico de ingresos mensuales..."
                className="w-full bg-black/40 border border-gray-700 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-all resize-none h-24"
                disabled={status === 'sending' || status === 'success'}
              />
              <span className="text-right text-sm px-4 w-full">{feedback.length} / 150</span>
            </div>

            <input type="text" className="hidden" onChange={(e) => setHoneypot(e.target.value)} />

            <button
              type="submit"
              disabled={status !== 'idle' || !feedback.trim()}
              className={`w-full py-3 rounded-2xl font-bold transition-all ${status === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50'
                }`}
            >
              {status === 'idle' && 'Enviar Feedback'}
              {status === 'sending' && 'Enviando a Discord...'}
              {status === 'success' && '¡Recibido! Gracias'}
              {status === 'error' && 'Error al enviar'}
            </button>
          </form>
        </div>
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
