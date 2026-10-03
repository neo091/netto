import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor, cleanup } from "@testing-library/react";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./useAuth";
import { supabase } from "../../lib/supabase";

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
});