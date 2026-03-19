import { useAuth } from "../context/auth/useAuth"
import SymbolSection from "../components/features/SymbolSection"
import PercentageSection from "../components/features/PercentageSection"
import WhatsAppConfigSection from "../components/features/WhatsAppConfigSection"
import ComingSoonSection from "../components/ComingSoonSection"
import NavSection from "../components/NavSection"

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
