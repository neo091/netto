import { useAuth } from "../context/auth/useAuth"
import SymbolSection from "../components/features/SymbolSection"
import PercentageSection from "../components/features/PercentageSection"
import WhatsAppConfigSection from "../components/features/WhatsAppConfigSection"
import ComingSoonSection from "../components/ComingSoonSection"
import NavSection from "../components/NavSection"
import { Link } from "react-router-dom"

const Config = () => {

  const { logout } = useAuth()

  return (
    <main className="bg-gray-900 min-h-screen text-white p-6 pb-24 fade-in">

      <NavSection label={"Configuración"} />

      <div className="max-w-md mx-auto flex flex-col gap-6">
        <SymbolSection />
        <PercentageSection />
        <WhatsAppConfigSection />
        <ComingSoonSection />

        {/* BOTÓN CERRAR SESIÓN */}
        <Link
          to={"/auth/new-password"}
          className="bg-gray-800/50 border border-gray-700 rounded-3xl py-2 px-4 text-white font-bold text-center hover:opacity-50 transition-all"
        >
          Cambiar contraseña
        </Link>

        {/* BOTÓN CERRAR SESIÓN */}
        <button
          onClick={() => logout()}
          className="mt-4 py-4 bg-red-500/10 border border-red-500/20 text-red-500 font-bold rounded-2xl hover:bg-red-500/20 transition-all"
        >
          Cerrar Sesión del Turno
        </button>
      </div>
    </main>
  )
}

export default Config
