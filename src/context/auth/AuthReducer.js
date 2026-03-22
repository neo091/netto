export const authReducer = (state, action) => {
  switch (action.type) {
    case "INIT_LOGIN":
      return {
        ...state,
        error: null,
        authLoading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        authLoading: false,
        error: null,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
      };
    case "LOADED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
