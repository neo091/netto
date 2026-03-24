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
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      is_test_user: supabaseUser.email === "test@netto.paginaweb.pro",
      ...profileData,
    };
  };

  const login = async ({ email, password }) => {
    dispatch({ type: "INIT_LOGIN" });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      dispatch({ type: "LOGIN_ERROR", payload: error.message });
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: "Credenciales inválidas" };
    }

    return { success: true };
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
          dispatch({ type: "INIT_LOGIN" });
          handleUser(session.user);
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

  return (
    <AuthContext.Provider
      value={{
        error: state.error,
        user: state.user,
        loading: state.loading,
        authLoading: state.authLoading,
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
};
