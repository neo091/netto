import { Link } from "react-router-dom";
import useLoginForm from "../../hooks/useLoginForm";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Turnstile } from "@marsidev/react-turnstile";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

function LoginFormSection() {
  const {
    handleLogin,
    email,
    password,
    setEmail,
    setPassword,
    authLoading,
    formError,
  } = useLoginForm();

  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);

  const handleRequestLogin = async (event) => {
    event.preventDefault();

    if (!turnstileToken) {
      toast.error("Completa la verificación antes de enviar.");
      return;
    }

    try {
      await handleLogin();
    } finally {
      // Cada token solo puede utilizarse una vez.
      setTurnstileToken("");
      turnstileRef.current?.reset();
    }
  };

  useEffect(() => {
    if (formError) toast.error(formError);
  }, [formError]);

  return (
    <form onSubmit={handleRequestLogin}>
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 flex flex-col gap-6">
        <h3 className="text-xl font-bold text-white mb-2">Iniciar Sesión</h3>

        {formError && (
          <div className="p-2 bg-red-200 text-red-600 rounded border border-red-400">
            <p>{formError}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Email
            </label>
            <input
              className="bg-gray-900/50 border border-gray-700 p-4 rounded-2xl block w-full text-white mt-1 focus:border-green-500 outline-none transition-all"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Contraseña
            </label>
            <input
              className="bg-gray-900/50 border border-gray-700 p-4 rounded-2xl block w-full text-white mt-1 focus:border-green-500 outline-none transition-all"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
        </div>

        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          options={{
            action: "request-access",
            theme: "dark",
          }}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken("")}
          onError={() => {
            setTurnstileToken("");
            toast.error(
              "No se pudo completar la verificación. Inténtalo de nuevo.",
            );
          }}
        />

        <button
          disabled={authLoading || !turnstileToken}
          type="submit"
          className="rounded-2xl p-4 bg-green-500 text-black font-bold text-lg hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 mt-2"
        >
          {authLoading ? "Entrando..." : "Entrar al Turno"}
        </button>

        <div className="text-center">
          <Link
            to="/auth/reset-password"
            className="text-gray-500 text-sm hover:text-white transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginFormSection;
