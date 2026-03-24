import { useNavigate } from "react-router-dom";
import CenterContentLayout from "../layouts/CenterContentLayout";
import { IconAlert, IconChevronLeft, IconWhatsapp } from "../assets/Icons";
import React, { useState, FC } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { useAuth } from "../context/auth/useAuth";

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_EDIT_PASSWORD_REDIRECT,
      });
      setEmail("");
      toast.success("Contraseña restablecida", {
        description:
          "te enviaremos un correo con las instrucciones para recuperar tu contraseña",
      });
    } catch (error) {
      toast.error("Contraseña NO restablecida", {
        description: "ocurrió un error, por favor reintentar mas tarde",
      });
    } finally {
      setLoading(false);
    }
  };

  if (user?.is_test_user) {
    return (
      <CenterContentLayout>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-6 p-2 bg-gray-800 rounded-full"
        >
          <IconChevronLeft />
        </button>
        <p>los usuarios de prueba no pueden cambiar la contraseña</p>
      </CenterContentLayout>
    );
  }

  return (
    <CenterContentLayout>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-6 p-2 bg-gray-800 rounded-full"
      >
        <IconChevronLeft />
      </button>

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 flex flex-col gap-6">
          <h3 className="text-xl font-bold text-white mb-2">
            ¿Olvidaste tu contraseña?
          </h3>
          <p>
            te enviaremos un correo con las instrucciones para recuperar tu
            contraseña
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Email
              </label>
              <input
                disabled={loading}
                className="bg-gray-900/50 border border-gray-700 p-4 rounded-2xl block w-full text-white mt-1 focus:border-green-500 outline-none transition-all"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full disabled:cursor-not-allowed bg-green-500 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
          >
            Enviar
          </button>
        </div>
      </form>

      <p className="text-center text-[10px] text-gray-600 mt-12 uppercase tracking-[0.3em]">
        Netto &copy; 2026
      </p>
    </CenterContentLayout>
  );
};
export default ResetPassword;
