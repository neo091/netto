import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import { loginService, logoutService } from "../../services/auth";
import { supabase } from "../../lib/supabase";
import { fetchUserProfile } from "../../lib/api";

// Estado inicial por defecto
const initialState = {
  user: null,
  loading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async ({ email, password }) => {
    dispatch({ type: "INIT_LOGIN" });
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      dispatch({ type: "LOGOUT" });
      throw new Error(error.message || "Credenciales incorrectas");
    }
  };

  useEffect(() => {
    let isMounted = true;
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!isMounted) return;
      if (data.session?.user) {
        dispatch({ type: "INIT_LOGIN" });
        const userData = await fetchUserProfile(data.session.user);
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      } else {
        dispatch({ type: "LOADED" }); // tipo que ponga loading false sin usuario
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

    const handleUser = async (user) => {
      try {
        const userData = await fetchUserProfile(user);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: userData || user,
        });
      } catch (err) {
        console.error("PROFILE ERROR:", err);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });
      }
    };

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        login,
        logout: async () => await supabase.auth.signOut(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
