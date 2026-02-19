import { Link } from "react-router-dom"
import { useAuth } from "../context/auth/useAuth"
import { useStatus } from "../context/status/useStatus"
import { IconChart, IconClock } from "../assets/Icons" // Asegúrate de tener iconos de historial y pausa
import { toast } from "sonner"

const Footer = () => {
  const { logout } = useAuth()
  const { restStatus, status } = useStatus()

  return (
    <footer className="w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 pb-6 pt-3 px-4 shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* BOTÓN HISTORIAL */}
        <Link
          to="/history"
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-2xl hover:bg-gray-800 active:scale-90 transition-all text-gray-400"
        >
          <span className="text-xl">📊</span>
          <span className="text-[10px] font-black uppercase tracking-widest">
            Historial
          </span>
        </Link>

        {/* BOTÓN DESCANSAR (DINÁMICO) */}
        <button
          onClick={() => {

            if (status === "ocupado") toast.error('no puedes descansar ahora')
            else
              restStatus()
          }}
          className={`flex flex-col items-center justify-center gap-1 py-2 rounded-2xl active:scale-90 transition-all ${status === "descansando"
            ? "text-yellow-500 bg-yellow-500/10 border border-yellow-500/20"
            : "text-gray-400 hover:bg-gray-800"
            }`}
        >
          <span className="text-xl">
            {status === "descansando" ? "⚡" : "☕"}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest">
            {status === "descansando" ? "Trabajar" : "Descansar"}
          </span>
        </button>

        {/* BOTÓN LOGOUT */}
        <button
          onClick={logout}
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-2xl hover:bg-red-500/10 group transition-all text-gray-400"
        >
          <span className="text-xl group-hover:filter-none">🚪</span>
          <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-red-500">
            Salir
          </span>
        </button>
      </div>
    </footer>
  )
}

export default Footer
