import { useState } from 'react'
import { useConfig } from '../../context/config/useConfig'
import { IconClock, IconWhatsapp } from '../../assets/Icons'

function WhatsAppConfigSection() {


  const {
    phone,
    updatePhone,
    whatsAppReport,
    toggleWhatsAppReport,
    toggleAbbreviated,
    abbreviated,
    currency,
  } = useConfig()


  const [editPhone, setEditPhone] = useState(false)


  const savePhoneHandler = (e) => {
    e.preventDefault()
    setEditPhone(false)
    // Aquí podrías añadir un pequeño toast de "Guardado"
    toast('telefono actualizado')
  }



  return (
    <>
      {/* SECCIÓN WHATSAPP */}
      <section className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-green-500">
              <IconWhatsapp size={6} />
            </div>
            <div>
              <h2 className="font-bold text-lg">Reportes por WhatsApp</h2>
              <p className="text-gray-500 text-xs text-balance">
                Número donde se enviarán los detalles de cada viaje.
              </p>
            </div>
          </div>
          {/* TOGGLE SWITCH */}
          <button
            onClick={() => {
              toast(`Reportes por WhatsApp ${!whatsAppReport ? "Activados" : "Desactivados"}`, {
                duration: 1000
              })
              toggleWhatsAppReport()
            }}
            className={`w-12 h-6 rounded-full transition-colors relative ${whatsAppReport ? "bg-green-500" : "bg-gray-700"}`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${whatsAppReport ? "left-7" : "left-1"}`}
            />
          </button>
        </div>

        {whatsAppReport && (
          <>
            {editPhone ? (
              <form
                onSubmit={savePhoneHandler}
                className="flex flex-col gap-4"
              >
                <input
                  type="tel"
                  autoFocus
                  onChange={(e) => updatePhone({ phone: e.target.value })}
                  value={phone}
                  className="w-full p-4 bg-gray-900 border border-green-500/50 text-white text-center text-xl rounded-2xl outline-none focus:ring-2 ring-green-500/20 transition-all"
                  placeholder="Ej: 34600000000"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-colors"
                >
                  Guardar Número
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <p className="text-3xl font-mono tracking-wider text-green-400">
                  {phone || "No configurado"}
                </p>
                <button
                  onClick={() => setEditPhone(true)}
                  className="text-sm font-bold text-gray-400 border border-gray-700 px-6 py-2 rounded-full hover:bg-gray-700 transition-all"
                >
                  Cambiar número
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {whatsAppReport && (
        <section className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconClock size={6} className="text-blue-400" />
              <div>
                <span className="font-bold block">Modo Abreviado</span>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                  Interfaz simplificada
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                toast(`Abreviado ${!abbreviated ? "Activados" : "Desactivados"}`, {
                  description: `${!abbreviated ? 'Ahora los mensajes enviados a WhatsApp estarán abreviados.' : "Ahora los mensajes enviados a WhatsApp estarán completos."}`,
                  duration: 3000,
                })
                toggleAbbreviated()
              }}
              className={`w-12 h-6 rounded-full transition-colors relative ${abbreviated ? "bg-blue-500" : "bg-gray-700"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${abbreviated ? "left-7" : "left-1"}`}
              />
            </button>
          </div>

          {/* VISTA PREVIA DINÁMICA */}
          <div className="mt-4 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50">
            <p className="text-[10px] text-gray-500 mb-1 uppercase font-bold">
              Ejemplo de envío:
            </p>
            <p className="text-sm font-mono text-blue-400">
              {abbreviated ? "15.00e" : `✅ 15.00 ${currency} - efectivo`}
            </p>
          </div>
        </section>
      )}
    </>
  )
}

export default WhatsAppConfigSection