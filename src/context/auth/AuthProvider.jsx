import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import { supabase } from "../../lib/supabase";
import { fetchUserProfile } from "../../lib/api";

const initialState = {
  user: null,
  error: null,
  loading: true,
  authLoading: false,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const createCleanUser = (supabaseUser, profileData) => {
    const email = supabaseUser.email ?? "";
    const metadata = supabaseUser.user_metadata ?? {};

    const metadataName =
      typeof metadata.display_name === "string"
        ? metadata.display_name.trim()
        : "";

    const profileName =
      typeof profileData?.first_name === "string"
        ? profileData.first_name.trim()
        : "";

    const defaultName = email.split("@")[0];

    const displayName =
      metadataName ||
      (profileName !== "Conductor" ? profileName : "") ||
      defaultName ||
      "Conductor";

    const showEmail = metadata.show_email === true;

    return {
      ...profileData,
      id: supabaseUser.id,
      email,
      is_test_user: supabaseUser.email === "test@netto.paginaweb.pro",
      first_name: displayName,
      display_name: displayName,
      show_email: showEmail,
      name_to_show: showEmail ? email : displayName,
    };
  };

  const login = async ({ email, password }) => {
    dispatch({ type: "INIT_LOGIN" });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        dispatch({ type: "LOGIN_ERROR", payload: error.message });
        return { success: false, error: error.message };
      }

      if (!data?.user) {
        const message = "Credenciales inválidas";

        dispatch({ type: "LOGIN_ERROR", payload: message });
        return { success: false, error: message };
      }

      return { success: true };
    } catch {
      const message = "No se pudo iniciar sesión. Inténtalo de nuevo.";

      dispatch({ type: "LOGIN_ERROR", payload: message });
      return { success: false, error: message };
    }
  };

  const handleUser = async (supabaseUser) => {
    try {
      const userData = await fetchUserProfile(supabaseUser);
      const cleanUser = createCleanUser(supabaseUser, userData);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: cleanUser,
      });
    } catch (err) {
      console.error("PROFILE ERROR:", err);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: createCleanUser(supabaseUser, null),
      });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!isMounted) return;
      if (data.session?.user) {
        dispatch({ type: "INIT_LOGIN" });
        try {
          const userData = await fetchUserProfile(data.session.user);

          const cleanUser = createCleanUser(data.session.user, userData);

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: cleanUser,
          });
        } catch {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: createCleanUser(data.session.user, null),
          });
        }
      } else {
        dispatch({ type: "LOADED" });
      }
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;

        if (event === "SIGNED_IN" && session?.user) {
          const signedInUser = session.user;

          dispatch({ type: "INIT_LOGIN" });

          setTimeout(() => {
            if (isMounted) {
              void handleUser(signedInUser);
            }
          }, 0);
        }

        if (event === "SIGNED_OUT") {
          dispatch({ type: "LOGOUT" });
        }
      },
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const updateDisplayName = async ({ name, showEmail }) => {
    if (!state.user) {
      return {
        success: false,
        error: "Inicia sesión para cambiar tu nombre.",
      };
    }

    const cleanName = typeof name === "string" ? name.trim() : "";

    if (!cleanName || cleanName.length > 80) {
      return {
        success: false,
        error: "El nombre debe tener entre 1 y 80 caracteres.",
      };
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          display_name: cleanName,
          show_email: showEmail === true,
        },
      });

      if (error || !data?.user) {
        return {
          success: false,
          error: "No se pudo guardar el nombre. Inténtalo de nuevo.",
        };
      }

      // Actualizamos la interfaz con el usuario devuelto por Supabase.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: createCleanUser(data.user, {
          ...state.user,
          first_name: cleanName,
        }),
      });

      return { success: true };
    } catch {
      return {
        success: false,
        error: "No se pudo conectar. Inténtalo de nuevo.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        user: state.user,
        loading: state.loading,
        authLoading: state.authLoading,
        updateDisplayName,
        login,
        logout: async () => {
          await supabase.auth.signOut();
          dispatch({ type: "LOGOUT" });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};;
