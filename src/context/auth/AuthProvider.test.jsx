import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  renderHook,
  act,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./useAuth";
import { supabase } from "../../lib/supabase";
import { fetchUserProfile } from "../../lib/api";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import Login from "../../pages/Login";

vi.mock("../../lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signInWithPassword: vi.fn(),
    },
  },
}));

vi.mock("../../lib/api", () => ({
  fetchUserProfile: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();

  supabase.auth.getSession.mockResolvedValue({
    data: { session: null },
    error: null,
  });

  supabase.auth.onAuthStateChange.mockReturnValue({
    data: {
      subscription: {
        unsubscribe: vi.fn(),
      },
    },
  });
});

afterEach(() => {
  cleanup();
});

describe("Proveedor de autenticación", () => {
  it("devuelve un error y termina la carga si falla la petición", async () => {
    supabase.auth.signInWithPassword.mockRejectedValueOnce(
      new TypeError("Failed to fetch"),
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Esperamos a que termine la comprobación inicial de sesión.
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let response;

    await act(async () => {
      response = await result.current.login({
        email: "prueba@example.com",
        password: "contraseña-de-prueba",
      });
    });

    expect(response).toEqual({
      success: false,
      error: "No se pudo iniciar sesión. Inténtalo de nuevo.",
    });

    expect(result.current.authLoading).toBe(false);

    expect(result.current.error).toBe(
      "No se pudo iniciar sesión. Inténtalo de nuevo.",
    );

    expect(result.current.user).toBeNull();
  });

  it("recupera la sesión existente y carga el perfil del usuario", async () => {
    const sessionUser = {
      id: "usuario-prueba",
      email: "prueba@example.com",
    };

    supabase.auth.getSession.mockResolvedValueOnce({
      data: {
        session: {
          user: sessionUser,
        },
      },
      error: null,
    });

    fetchUserProfile.mockResolvedValueOnce({
      name: "Marcos",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchUserProfile).toHaveBeenCalledWith(sessionUser);

    expect(result.current.user).toEqual({
      id: "usuario-prueba",
      email: "prueba@example.com",
      is_test_user: false,
      name: "Marcos",
    });

    expect(result.current.authLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("elimina al usuario cuando Supabase notifica el cierre de sesión", async () => {
    supabase.auth.getSession.mockResolvedValueOnce({
      data: {
        session: {
          user: {
            id: "usuario-prueba",
            email: "prueba@example.com",
          },
        },
      },
      error: null,
    });

    fetchUserProfile.mockResolvedValueOnce({
      name: "Marcos",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.user?.id).toBe("usuario-prueba");
    });

    // Recuperamos la función registrada para escuchar eventos.
    const onAuthChange = supabase.auth.onAuthStateChange.mock.calls[0][0];

    // Simulamos el aviso de cierre de sesión.
    act(() => {
      onAuthChange("SIGNED_OUT", null);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.authLoading).toBe(false);
  });

  it("conserva el historial al recuperar la sesión y muestra login al cerrarla", async () => {
    supabase.auth.getSession.mockResolvedValueOnce({
      data: {
        session: {
          user: {
            id: "usuario-prueba",
            email: "prueba@example.com",
          },
        },
      },
      error: null,
    });

    fetchUserProfile.mockResolvedValueOnce({
      name: "Marcos",
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={["/history"]}>
          <Routes>
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <p>Historial de prueba</p>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<p>Página de inicio de prueba</p>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>,
    );

    // Recuperar la sesión debe conservar la página solicitada.
    expect(await screen.findByText("Historial de prueba")).not.toBeNull();

    expect(screen.queryByText("Página de inicio de prueba")).toBeNull();

    // Supabase comunica que la sesión se ha cerrado.
    const onAuthChange = supabase.auth.onAuthStateChange.mock.calls[0][0];

    act(() => {
      onAuthChange("SIGNED_OUT", null);
    });

    expect(
      await screen.findByRole("button", { name: "Entrar al Turno" }),
    ).not.toBeNull();

    expect(screen.queryByText("Historial de prueba")).toBeNull();
  });
});