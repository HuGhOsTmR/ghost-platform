import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login } from '../services/auth.service'
import { useAuthStore } from '../store/authStore'

export default function LoginPage() {

  const navigate = useNavigate()

  const setTokens = useAuthStore(
    (state) => state.setTokens
  )

  const [username, setUsername] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    setError('')
    setLoading(true)

    try {

      const response = await login({
        username,
        password,
      })

      setTokens(
        response.access,
        response.refresh
      )

      navigate('/dashboard')

    } catch (err) {

      setError(
        'Usuario o contraseña incorrectos'
      )

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="w-full max-w-md p-6 rounded-lg shadow">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Ghost ERP
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            className="w-full border rounded p-2"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            placeholder="Usuario"
          />

          <input
            className="w-full border rounded p-2"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Contraseña"
          />

          {error && (

            <div className="text-red-600 text-sm">
              {error}
            </div>

          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded p-2 border"
          >
            {
              loading
                ? 'Ingresando...'
                : 'Ingresar'
            }
          </button>

        </form>

      </div>

    </div>
  )
}