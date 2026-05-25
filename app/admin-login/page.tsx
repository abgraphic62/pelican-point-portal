'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleLogin = () => {
    if (password === 'pelican123') {
      router.push('/admin')
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Pelican Point East
        </h1>

        <p className="text-gray-600 mb-4 text-center">
          Admin Login
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">
            {error}
          </p>
        )}

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-4 rounded-xl mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700"
        >
          Login
        </button>

      </div>

    </main>
  )
}