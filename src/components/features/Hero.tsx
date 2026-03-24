import { Link } from "react-router-dom";
import PageTitle from "../ui/PageTitle";

const Hero = () => {
  return (
    <header className="relative py-16 px-6 flex flex-col items-center text-center overflow-hidden">
      <div className="absolute top-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full -z-10"></div>
      <div className="flex items-center gap-2 bg-gray-800 text-green-400 text-xs font-bold px-4 py-1.5 rounded-full border border-green-500/20 mb-6 uppercase tracking-widest">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Netto: Tu liquidación bajo control
      </div>

      <PageTitle />

      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
        Tu parte del turno, <br />{" "}
        <span className="text-green-500 text-balance">
          clara y al instante.
        </span>
      </h2>

      <p className="text-gray-400 text-lg max-w-md mb-10 leading-relaxed">
        La app diseñada para que el taxista sepa exactamente cuánto dinero lleva
        en el bolsillo y cuánto debe liquidar.
      </p>

      <div className="flex flex-col w-full gap-4 px-4 sm:flex-row sm:justify-center">
        <Link
          to="/login"
          className="bg-green-500 text-black font-bold py-4 px-8 rounded-2xl text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(74,222,128,0.3)]"
        >
          Iniciar Jornada
        </Link>
        <Link
          to={"/Functions"}
          className="bg-gray-800 text-white font-bold py-4 px-8 rounded-2xl text-lg border border-gray-700"
        >
          Ver Funciones
        </Link>
      </div>
    </header>
  );
};

export default Hero;
