export const authReducer = (state, action) => {
  switch (action.type) {
    case "INIT_LOGIN":
      return {
        ...state,
        loading: true,
      }
    case "LOGIN_SUCCESS":
      return {
        loading: false,
        user: action.payload,
      }
    case "LOGOUT":
      return {
        user: null,
        loading: false,
      }
    case "LOADED":
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
