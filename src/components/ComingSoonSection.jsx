import React from 'react'
import { IconCog } from '../assets/Icons'

function ComingSoonSection() {
  return (
    <section className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6 opacity-50">
      <div className="flex items-center gap-3">
        <IconCog size={6} className="text-gray-500" />
        <p className="font-bold text-gray-500 uppercase text-xs tracking-widest">
          Próximamente
        </p>
      </div>
      <p className="text-gray-600 text-sm mt-2 font-medium">
        Gestión de gastos de combustible y metas diarias.
      </p>
    </section>
  )
}

export default ComingSoonSection