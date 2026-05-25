'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    if (password === 'owners123') {
      router.push('/owners')
    } else {
      setMessage('Incorrect password')
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Owners Login
        </h1>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-4 rounded-xl"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </div>
    </main>
  )
}
