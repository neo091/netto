import { Link } from "react-router-dom"

export const HomeCTASection = () => {
  return (
    <footer className="py-24 px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">
        ¿Listo para conducir con Netto?
      </h2>
      <p className="text-gray-400 mb-10 max-w-lg mx-auto">
        La tecnología que tu taxi necesita para que tú solo te preocupes de
        conducir.
      </p>
      <Link
        to="/SignUp"
        className="inline-block bg-white text-black font-bold py-4 px-12 rounded-2xl text-lg hover:bg-green-500 transition-colors"
      >
        Crear mi cuenta gratis
      </Link>
      <p className="text-center text-[10px] text-gray-600 mt-12 uppercase tracking-[0.3em]">
        Netto &copy; 2026
      </p>
    </footer>
  )
}

export default HomeCTASection
