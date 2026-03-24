import { redirect, useNavigate } from "react-router-dom";
import { IconChevronLeft } from "../assets/Icons";
import CenterContentLayout from "../layouts/CenterContentLayout";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { useAuth } from "../context/auth/useAuth";

const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      await supabase.auth.updateUser({ password });
      toast.success("contraseña cambiada");
      setPassword("");
      navigate("/");
    } catch {
      toast.error("ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };
  return (
    <CenterContentLayout>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-6 p-2 bg-gray-800 rounded-full"
      >
        <IconChevronLeft />
      </button>

      {loading && <p>enviando...</p>}

      {user?.is_test_user ? (
        <p>los usuarios de prueba no pueden cambiar la contraseña</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white mb-2">
              Restablecer la contraseña
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                  Contraseña
                </label>
                <input
                  disabled={loading}
                  required
                  className="bg-gray-900/50 border border-gray-700 p-4 rounded-2xl block w-full text-white mt-1 focus:border-green-500 outline-none transition-all"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-green-500 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
            >
              Enviar
            </button>
          </div>
        </form>
      )}

      <p className="text-center text-[10px] text-gray-600 mt-12 uppercase tracking-[0.3em]">
        Netto &copy; 2026
      </p>
    </CenterContentLayout>
  );
};
export default NewPassword;
