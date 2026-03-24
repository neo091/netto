import { useState } from "react";
import { Link } from "react-router-dom";
import { IconChevronLeft, IconWhatsapp, IconAlert } from "../assets/Icons";
import { toast } from "sonner";
import CenterContentLayout from "../layouts/CenterContentLayout";

const BASE_API = import.meta.env.VITE_N8N_API_BASE;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const createAccount = async () => {
    setLoading(true);
    setSuccess(null);
    try {
      const response = await fetch(
        `${BASE_API}/webhook/d821c59d-8db3-4e5f-a8f6-504e33987fc3`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      if (response.ok) {
        toast.success("enviado!");
        setEmail("");
        setSuccess(
          "Hemos recibido tu peticion, sera procesada y te enviaremos un correo al finalizar la verificacion",
        );
      }
    } catch (error) {
      toast.error("ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccess = (e) => {
    e.preventDefault();

    createAccount();
  };

  return (
    <CenterContentLayout>
      {/* Decoración de fondo (Brillo Esmeralda sutil) */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <Link
        to="/"
        className="absolute top-8 left-6 p-2 bg-gray-800 rounded-full"
      >
        <IconChevronLeft />
      </Link>

      <div className="max-w-md mx-auto w-full z-10">
        <div className="mb-8 text-center">
          {/* Contenedor con brillo sutil */}
          <div className="inline-flex p-5 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6 relative">
            <IconAlert size={8} className="text-emerald-500 animate-pulse" />
            {/* Un pequeño aro extra decorativo */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/5 animate-ping"></div>
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-2">
            Netto <span className="text-green-500">Beta</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Actualmente estamos en fase de desarrollo cerrado. <br />
            Solo conductores verificados pueden acceder.
          </p>
        </div>

        <form onSubmit={handleRequestAccess} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-gray-500 ml-4 tracking-widest">
              Tu Email de contacto
            </label>
            <input
              autoComplete="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@ejemplo.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-2xl py-4 px-6 focus:outline-none focus:border-emerald-500 transition-all placeholder:text-gray-600"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-500 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
          >
            {loading ? "Solicitando..." : "Solicitar Invitación"}
          </button>
        </form>

        <div className="mt-12 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-600 font-bold">
                O hablemos por
              </span>
            </div>
          </div>

          <a
            href="https://wa.me/604994352" // Tu número del ConfigProvider
            className="flex items-center justify-center gap-3 w-full bg-gray-800 border border-gray-700 p-4 rounded-2xl hover:bg-gray-700 transition-all"
          >
            <IconWhatsapp size={6} className="text-green-500" />
            <span className="font-bold text-sm text-gray-300">
              Soporte para Conductores
            </span>
          </a>
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-600 mt-12 uppercase tracking-[0.3em]">
        Netto &copy; 2026
      </p>
    </CenterContentLayout>
  );
};

export default SignUp;
