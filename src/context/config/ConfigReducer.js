export const configReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PHONE":
      return {
        ...state,
        phone: action.payload,
      }
    case "TOGGLE_ABBREVIATED":
      return {
        ...state,
        abbreviated: !state.abbreviated,
      }
    case "TOGGLE_WHATSAPP_REPORT":
      return {
        ...state,
        whatsAppReport: !state.whatsAppReport,
      }
    case "SET_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      }
    case "UPDATE_PORCENTAJE":
      return {
        ...state,
        percentage: action.payload
      }
    default:
      return state
  }
}
