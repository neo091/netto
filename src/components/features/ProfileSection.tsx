import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/auth/useAuth";

export default function ProfileSection() {
  const { user, updateDisplayName } = useAuth();

  const [name, setName] = useState(user?.display_name ?? "");
  const [showEmail, setShowEmail] = useState(
    user?.show_email === true,
  );
  const [saving, setSaving] = useState(false);
  const submittingRef = useRef(false);

  const preview = showEmail
    ? user?.email
    : name.trim() || user?.email?.split("@")[0];

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (submittingRef.current) return;

    submittingRef.current = true;
    setSaving(true);

    try {
      const result = await updateDisplayName({
        name,
        showEmail,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      setName(name.trim());
      toast.success("Nombre actualizado.");
    } finally {
      submittingRef.current = false;
      setSaving(false);
    }
  };

  return (
    <section className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6">
      <h2 className="font-bold mb-2">Tu nombre</h2>

      <p className="text-sm text-gray-400 mb-4">
        Elige cómo quieres aparecer en Netto.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="profile-display-name"
            className="block text-sm text-gray-300 mb-2"
          >
            Nombre para mostrar
          </label>

          <input
            id="profile-display-name"
            type="text"
            required
            maxLength={80}
            value={name}
            disabled={saving}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500"
          />
        </div>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={showEmail}
            disabled={saving}
            onChange={(e) => setShowEmail(e.target.checked)}
            className="accent-green-500"
          />
          Mostrar mi correo en lugar del nombre
        </label>

        <p className="text-sm text-gray-400 break-breaks">
          Vista previa:{" "}
          <span className="text-green-400">
            Hola, {preview}
          </span>
        </p>

        <button
          type="submit"
          disabled={saving || !name.trim()}
          className="w-full bg-green-500 text-black font-bold py-3 rounded-xl disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar nombre"}
        </button>
      </form>
    </section>
  );
}