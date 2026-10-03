import { Link } from "react-router-dom";
import { IconChevronLeft, IconDelete, IconAlert } from "../assets/Icons"; // Asegúrate de que la ruta sea correcta
import useFunctions from "../hooks/useFunctions";
import FunctionsSection from "../components/functions/FunctionsSection";
import FeedbackForm from "../components/functions/FeedbackForm";
import HeaderBlur from "../components/ui/HeaderBlur";
import { useAuth } from "../context/auth/useAuth";

const Functions = () => {
  const {
    handleSubmit,
    status,
    feedback,
    setFeedback,
    setHoneypot,
    feedbackError,
  } = useFunctions();

  const { user, loading } = useAuth();
  return (
    <main className="bg-gray-900 min-h-screen text-white p-6 pb-24 font-sans fade-in ">
      {/* Header con efecto Blur */}
      <HeaderBlur label="Funciones" />

      <FunctionsSection />

      <div className="mt-8">
        <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-3xl max-w-md m-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <IconAlert className="text-emerald-500" />
            </div>
            <h3 className="font-bold text-lg">
              ¿Qué función te gustaría que agreguemos?
            </h3>
          </div>

          {!loading && user && (
            <FeedbackForm
              status={status}
              handleSubmit={handleSubmit}
              feedback={feedback}
              setFeedback={setFeedback}
              setHoneypot={setHoneypot}
              feedbackError={feedbackError}
            />
          )}

          {!loading && !user && (
            <div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-center mt-8">
              <Link
                to="/login"
                className="bg-green-500 text-black font-bold py-4 px-8 rounded-2xl text-md hover:scale-105 transition-transform shadow-[0_0_20px_rgba(74,222,128,0.3)]"
              >
                Iniciar Sesión
              </Link>
              <Link
                to={"/SignUp"}
                className="bg-gray-800 text-white font-bold py-4 px-8 rounded-2xl text-md border border-gray-700"
              >
                Crear Cuenta
              </Link>
            </div>
          )}
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
            Tus datos se almacenan de forma local y segura. Netto no comparte tu
            información financiera.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Functions;
