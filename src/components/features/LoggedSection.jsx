import React from 'react'
import PageTitle from '../PageTitle'
import { Link } from 'react-router-dom'

function LoggedSection() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Decoración de fondo para mantener el estilo de la Landing */}
      <div className="absolute top-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full z-0"></div>

      <div className="w-full max-w-md z-10">
        {/* Logo o Nombre de la App */}
        <div className="text-center mb-10">
          <PageTitle />
          <p className="text-gray-400 mt-2">Bienvenido de nuevo, compañero.</p>
        </div>

        <Link to={'/'} className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 flex flex-col gap-6 text-center text-gray-500 text-xl hover:text-white transition-colors">

          <span>
            Ir al Dashboard
          </span>
        </Link>


      </div>
    </div>
  )
}

export default LoggedSection