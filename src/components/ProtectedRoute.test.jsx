import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/auth/useAuth";

// Simulamos la sesión sin conectarnos a Supabase.
vi.mock("../context/auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

// Usamos un indicador sencillo para reconocer la carga.
vi.mock("./Loader", () => ({
  default: () => <p>Cargando sesión</p>,
}));

function TestApp() {
  return (
    <MemoryRouter initialEntries={["/history"]}>
      <Routes>
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <p>Historial de viajes</p>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<p>Página de login</p>} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Rutas protegidas", () => {
  it("espera la sesión y conserva la página cuando llega el usuario", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: true,
    });

    const { rerender } = render(<TestApp />);

    expect(screen.queryByText("Cargando sesión")).not.toBeNull();
    expect(screen.queryByText("Página de login")).toBeNull();

    // La sesión termina de cargar.
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "usuario-prueba" },
      loading: false,
    });

    rerender(<TestApp />);

    expect(screen.queryByText("Historial de viajes")).not.toBeNull();
    expect(screen.queryByText("Página de login")).toBeNull();
    expect(screen.queryByText("Cargando sesión")).toBeNull();
  });

  it("redirige al login cuando termina la carga sin usuario", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<TestApp />);

    expect(screen.queryByText("Página de login")).not.toBeNull();
    expect(screen.queryByText("Historial de viajes")).toBeNull();
  });

  it("muestra la página cuando el usuario tiene sesión", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "usuario-prueba" },
      loading: false,
    });

    render(<TestApp />);

    expect(screen.queryByText("Historial de viajes")).not.toBeNull();
    expect(screen.queryByText("Página de login")).toBeNull();
  });
});