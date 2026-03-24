import { useState } from "react";
import { sendFeedback } from "../lib/api";

export default function useFunctions() {
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("idle");
  const [honeypot, setHoneypot] = useState("");
  const [feedbackError, setFeedbackError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackError(null);
    if (honeypot) return;
    if (!feedback.trim()) return;

    if (feedback.trim().length < 10) {
      setFeedbackError("Por favor, describe un poco más tu sugerencia.");
      return;
    }

    if (feedback.trim().length > 150) {
      setFeedbackError("Por favor, describe un poco más tu sugerencia.");
      return;
    }

    setStatus("sending");

    const response = await sendFeedback({ feedback });

    if (response.message) {
      setStatus("success");
      setFeedback("");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      console.log("error al enviar");
      setStatus("error");
      setFeedback("");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };
  return {
    handleSubmit,
    status,
    feedback,
    setFeedback,
    honeypot,
    setHoneypot,
    feedbackError,
  };
}
