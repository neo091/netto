import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/useAuth";

export default function useLoginForm() {
  const [email, setEmail] = useState(""); // test@netto.paginaweb.pro
  const [password, setPassword] = useState(""); // B6KHJKYs8cb
  const [formError, setFormError] = useState(null);
  const { login, authLoading, error: loginError } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError(null);
    const validEmail = email.trim().toLowerCase();

    if (!validEmail || !password) {
      setFormError("Email y contraseña son obligatorios");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(validEmail)) {
      setFormError("Email inválido");
      return;
    }

    const { success, error } = await login({
      email: validEmail,
      password,
    });

    if (!success) {
      setFormError(error);
    }
  };

  useEffect(() => {
    if (loginError) {
      setFormError(loginError);
    }
  }, [loginError]);

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    authLoading,
    formError,
  };
}
