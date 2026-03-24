import { useEffect } from "react";
import { toast } from "sonner";

interface FeedbackFormProps {
  handleSubmit: () => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
  setHoneypot: (honeyPot: string) => void;
  status: string;
  feedbackError?: string;
}

const FeedbackForm = ({
  handleSubmit,
  feedback,
  setHoneypot,
  setFeedback,
  status,
  feedbackError,
}: FeedbackFormProps) => {
  useEffect(() => {
    if (feedbackError) toast.error(feedbackError);
    if (status === "success") toast.success("enviado correctamente");
  }, [status, feedbackError]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <textarea
          minLength={10}
          maxLength={150}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Ej: Me gustaría ver un gráfico de ingresos mensuales..."
          className="w-full bg-black/40 border border-gray-700 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-all resize-none h-24"
          disabled={status === "sending" || status === "success"}
        />
        <span className="text-right text-sm px-4 w-full">
          {feedback.length} / 150
        </span>
      </div>

      <input
        type="text"
        className="hidden"
        onChange={(e) => setHoneypot(e.target.value)}
      />

      <button
        type="submit"
        disabled={status !== "idle" || !feedback.trim()}
        className={`w-full py-3 rounded-2xl font-bold transition-all ${
          status === "success"
            ? "bg-emerald-600 text-white"
            : "bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-50"
        }`}
      >
        {status === "idle" && "Enviar Feedback"}
        {status === "sending" && "Enviando a Discord..."}
        {status === "success" && "¡Recibido! Gracias"}
        {status === "error" && "Error al enviar"}
      </button>
    </form>
  );
};
export default FeedbackForm;
