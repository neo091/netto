import React from 'react'
import { useConfig } from '../../context/config/useConfig'

function PercentageSection() {
  const { percentage, updatePorcentaje } = useConfig()
  return (
    <section className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-4">

        <div>
          <span className="font-bold block">Porcentaje  <span className="text-yellow-500 font-bold text-xl w-10 text-center">
            {percentage} %
          </span></span>
          <p className="text-[10px] text-gray-500 uppercase">
            % de cuanto ganaras por cada carrera (viaje)
          </p>
        </div>
      </div>

      <div className="flex justify-between bg-gray-900/50 p-2 rounded-2xl border border-gray-700">
        <input type="range" min={0} max={100} value={percentage || 40} onChange={(e) => {
          updatePorcentaje(e.target.value)

        }} className="w-full" />
      </div>
    </section>
  )
}

export default PercentageSection    