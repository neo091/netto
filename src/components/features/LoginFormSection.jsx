import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth'
import Swal from 'sweetalert2'
import { toast } from 'sonner'

function LoginFormSection() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()

  const loginHandle = async (e) => {
    e.preventDefault()
    const newUsername = email.trim().toLowerCase()
    const newPassword = password.trim()

    if (!newUsername || !newPassword) {
      toast.error("Email y contraseña son obligatorios")
      return
    }

    try {
      await login({ email: newUsername, password: newPassword })
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={loginHandle}>
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700 flex flex-col gap-6">
        <h3 className="text-xl font-bold text-white mb-2">
          Iniciar Sesión
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Email
            </label>
            <input
              className="bg-gray-900/50 border border-gray-700 p-4 rounded-2xl block w-full text-white mt-1 focus:border-green-500 outline-none transition-all"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Contraseña
            </label>
            <input
              className="bg-gray-900/50 border border-gray-700 p-4 rounded-2xl block w-full text-white mt-1 focus:border-green-500 outline-none transition-all"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-2xl p-4 bg-green-500 text-black font-bold text-lg hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20 mt-2"
        >
          Entrar al Turno
        </button>

        <div className="text-center">
          <Link
            to="/auth/reset-password"
            className="text-gray-500 text-sm hover:text-white transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </form>
  )
}

export default LoginFormSection