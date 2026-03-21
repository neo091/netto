import { useEffect, useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./AuthReducer"
import { loginService, logoutService } from "../../services/auth"
import { supabase } from "../../lib/supabase"
import { fetchUserProfile } from "../../lib/api"

// Estado inicial por defecto
const initialState = {
  user: null,
  loading: false,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, undefined, () => {
    const localData = localStorage.getItem("auth_session")
    return localData ? JSON.parse(localData) : initialState
  })

  const login = async ({ email, password }) => {
    dispatch({ type: "INIT_LOGIN" })

    try {
      const { user, error } = await loginService({ email, password })

      if (error) {
        dispatch({ type: "LOGOUT" })
        throw new Error(error.message || "Credenciales incorrectas")
      }

      const userData = await fetchUserProfile(user)

      dispatch({ type: "LOGIN_SUCCESS", payload: userData })
      return userData
    } catch (error) {
      console.error("error en context:", error.message)
      throw error
    }
  }

  const logout = async () => {
    try {
      dispatch({ type: "LOGOUT" })
      await logoutService()
      localStorage.removeItem("auth_session")
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    localStorage.setItem(
      "auth_session",
      JSON.stringify({ user: state.user, loading: state.loading }),
    )
  }, [state.user])

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        const user = data.session.user

        const userData = {
          id: user.id,
          ...user.user_metadata,
        }

        dispatch({ type: "LOGIN_SUCCESS", payload: userData })

      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          const user = session.user

          const userData = await fetchUserProfile(user)

          dispatch({ type: "LOGIN_SUCCESS", payload: userData })

        }

        if (event === "SIGNED_OUT") {
          dispatch({ type: "LOGOUT" })
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: state.user, loading: state.loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
