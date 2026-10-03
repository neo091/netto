import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginFormSection from "./LoginFormSection";
import { useAuth } from "../../context/auth/useAuth";

vi.mock("../../context/auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

// Los avisos emergentes no necesitan mostrarse en estas pruebas.
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

const loginMock = vi.fn();

function renderForm() {
  return render(
    <MemoryRouter>
      <LoginFormSection />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.resetAllMocks();

  vi.mocked(useAuth).mockReturnValue({
    login: loginMock,
    authLoading: false,
    error: null,
  });
});

afterEach(() => {
  cleanup();
});

describe("Formulario de login", () => {
  it("muestra un error si los campos están vacíos", async () => {
    renderForm();

    fireEvent.click(
      screen.getByRole("button", { name: "Entrar al Turno" }),
    );

    expect(
      await screen.findByText("Email y contraseña son obligatorios"),
    ).not.toBeNull();

    // No debe intentar autenticar datos vacíos.
    expect(loginMock).not.toHaveBeenCalled();
  });

  it("muestra el error cuando se rechazan las credenciales", async () => {
    loginMock.mockResolvedValue({
      success: false,
      error: "Credenciales inválidas",
    });

    renderForm();

    fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
      target: { value: "prueba@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "contraseña-de-prueba" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Entrar al Turno" }),
    );

    expect(
      await screen.findByText("Credenciales inválidas"),
    ).not.toBeNull();

    expect(loginMock).toHaveBeenCalledTimes(1);
    expect(loginMock).toHaveBeenCalledWith({
      email: "prueba@example.com",
      password: "contraseña-de-prueba",
    });
  });

  it("desactiva el botón mientras se está iniciando sesión", () => {
    vi.mocked(useAuth).mockReturnValue({
      login: loginMock,
      authLoading: true,
      error: null,
    });

    renderForm();

    const button = screen.getByRole("button", {
      name: "Entrando...",
    });

    expect(button.disabled).toBe(true);
  });

  it("convierte el email a minúsculas antes de iniciar sesión", async () => {
    loginMock.mockResolvedValue({
      success: true,
    });

    renderForm();

    fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
      target: { value: "Marcos@Example.COM" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "contraseña-de-prueba" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Entrar al Turno" }),
    );

    expect(loginMock).toHaveBeenCalledTimes(1);
    expect(loginMock).toHaveBeenCalledWith({
      email: "marcos@example.com",
      password: "contraseña-de-prueba",
    });

    expect(
      screen.queryByText("Email y contraseña son obligatorios"),
    ).toBeNull();

    expect(screen.queryByText("Email inválido")).toBeNull();
  }); 

  it("permite volver a intentar el login después de un error", async () => {
    loginMock
      .mockResolvedValueOnce({
        success: false,
        error: "No se pudo conectar. Inténtalo de nuevo.",
      })
      .mockResolvedValueOnce({
        success: true,
      });

    renderForm();

    fireEvent.change(screen.getByPlaceholderText("tu@email.com"), {
      target: { value: "prueba@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "contraseña-de-prueba" },
    });

    const button = screen.getByRole("button", {
      name: "Entrar al Turno",
    });

    // El primer intento recibe un error.
    fireEvent.click(button);

    expect(
      await screen.findByText(
        "No se pudo conectar. Inténtalo de nuevo.",
      ),
    ).not.toBeNull();

    expect(button.disabled).toBe(false);

    // El segundo intento recibe una respuesta correcta.
    fireEvent.click(button);

    expect(loginMock).toHaveBeenCalledTimes(2);

    expect(
      screen.queryByText("No se pudo conectar. Inténtalo de nuevo."),
    ).toBeNull();
  });
});