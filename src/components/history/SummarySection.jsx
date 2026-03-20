import { useState } from 'react'
import { useConfig } from '../../context/config/useConfig'

function SummarySection({ stats, filter }) {

  const { percentage, currency } = useConfig()
  const [showSummary, setShowSummary] = useState(false)

  return (
    <section className=" max-w-md mx-auto w-full">
      <button
        onClick={() => setShowSummary(!showSummary)}
        className="w-full mb-4 bg-gray-800 border border-gray-700 p-4 rounded-2xl flex justify-between items-center active:scale-95 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="bg-green-500/10 p-2 rounded-lg">💰</div>
          <div className="text-left">
            <p className="text-[10px] text-gray-500 uppercase font-bold">
              Ganancia {filter} ({percentage}%)
            </p>
            <p className="text-xl font-black text-white">
              {stats.gananciaNeta}
              {currency}
            </p>
          </div>
        </div>
        <span
          className={`text-gray-500 transition-transform ${showSummary ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {showSummary && (
        <div className="bg-gray-800/80 border border-gray-700 rounded-3xl p-6 mb-6 shadow-2xl">
          {/* GANANCIA REAL (TU 40%) */}
          <div className="text-center mb-6 pb-6 border-b border-gray-700/50">
            <p className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Tu Ganancia Neta ({percentage}%)
            </p>
            <p className="text-4xl font-black text-white">
              {stats.gananciaNeta}
              <span className="text-xl ml-1 text-green-500">
                {currency}
              </span>
            </p>
            <p className="text-[9px] text-gray-500 uppercase mt-1 tracking-widest">
              Sobre un bruto de {stats.totalBruto}
              {currency}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-gray-900/50 p-3 rounded-2xl border border-gray-700">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                En Tarjeta
              </p>
              <p className="font-bold text-blue-400">
                {stats.totalTarjeta}
                {currency}
              </p>
            </div>
            <div className="bg-gray-900/50 p-3 rounded-2xl border border-gray-700">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                En Efectivo
              </p>
              <p className="font-bold text-green-400">
                {stats.totalEfectivo}
                {currency}
              </p>
            </div>
          </div>
          <div
            className={`p-4 rounded-2xl flex justify-between items-center ${stats.diferenciaEfectivo >= 0
              ? "bg-green-500/10 border border-green-500/20" // Caso: Te falta cobrar
              : "bg-red-500/10 border border-red-500/20" // Caso: Debes entregar
              }`}
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
                {stats.diferenciaEfectivo >= 0
                  ? "La empresa te debe abonar:"
                  : "Debes entregar a la empresa:"}
              </p>
              <p
                className={`text-xl font-black ${stats.diferenciaEfectivo >= 0
                  ? "text-green-500"
                  : "text-red-500"
                  }`}
              >
                {Math.abs(stats.diferenciaEfectivo)} {currency}
              </p>
            </div>
            <div className="text-2xl">
              {stats.diferenciaEfectivo >= 0 ? "💰" : "📉"}
            </div>
          </div>

          <p className="text-[10px] text-center text-gray-500 mt-4 italic px-2">
            {stats.diferenciaEfectivo >= 0
              ? `Quédate con todo tu efectivo (${stats.totalEfectivo}${currency}) y reclama la diferencia.`
              : `De tus ${stats.totalEfectivo}${currency} en efectivo, quédate con tu parte y entrega el sobrante.`}
          </p>
        </div>
      )}
    </section>
  )
}

export default SummarySection