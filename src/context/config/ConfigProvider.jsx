import { useEffect, useReducer } from "react"
import { ConfigContext } from "./ConfigContext"
import { configReducer } from "./ConfigReducer"

const LOCAL_CONFIG = "local_config"

const initialState = {
  phone: "604994352",
  abbreviated: true,
  whatsAppReport: false,
  currency: "€",
  percentage: 40
}

export const ConfigProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, undefined, () => {
    const localData = JSON.parse(localStorage.getItem(LOCAL_CONFIG))
    return localData ? { ...initialState, ...localData } : initialState
  })

  const setCurrency = (symbol) =>
    dispatch({ type: "SET_CURRENCY", payload: symbol })
  const toggleAbbreviated = () => dispatch({ type: "TOGGLE_ABBREVIATED" })
  const toggleWhatsAppReport = () =>
    dispatch({ type: "TOGGLE_WHATSAPP_REPORT" })
  const updatePhone = ({ phone }) =>
    dispatch({ type: "UPDATE_PHONE", payload: phone })
  const updatePorcentaje = (newPorcentaje) => {
    dispatch({ type: "UPDATE_PORCENTAJE", payload: Number(newPorcentaje) })
  }


  useEffect(() => {
    localStorage.setItem(LOCAL_CONFIG, JSON.stringify(state))
  }, [state])

  return (
    <ConfigContext.Provider
      value={{
        phone: state.phone,
        abbreviated: state.abbreviated,
        whatsAppReport: state.whatsAppReport,
        currency: state.currency,
        percentage: state.percentage,
        updatePorcentaje,
        setCurrency,
        toggleAbbreviated,
        updatePhone,
        toggleWhatsAppReport,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}
