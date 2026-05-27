'use client'
import { supabase } from "../../lib/supabase";

import { useState } from 'react'

export default function OwnersPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    condo: '',
    from: '',
    to: '',
    notes: '',
  })

  const handleSubmit = async () => {
    if (!formData.name || !formData.condo) {
        setError('Please enter your name and condo number.')
        return
      }
      console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      console.log(supabase)
    const { data, error } = await supabase.from("away_notices").insert([
      {
        name: formData.name,
        condo: formData.condo,
        from_date: formData.from,
        to_date: formData.to,
        notes: formData.notes,
      },
    ]);
    console.log(data)
console.log(error)
if (error) {
  alert(error.message)
}
  
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-2xl mx-auto bg-white p-5 md:p-10 rounded-2xl shadow-xl">

      <h1 className="text-2xl md:text-4xl font-bold mb-8">
        {error && (
 <p className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">
    {error}
  </p>
)}
          Pelican Point East Away Notice
        </h1>

        {!submitted ? (
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Condo Number"
              value={formData.condo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  condo: e.target.value,
                })
              }
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="date"
              value={formData.from}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  from: e.target.value,
                })
              }
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="date"
              value={formData.to}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  to: e.target.value,
                })
              }
              className="w-full border p-4 rounded-xl"
            />

            <textarea
              placeholder="Notes for management"
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
              className="w-full border p-4 rounded-xl h-32"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700"
            >
              Submit Away Notice
            </button>

          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Submitted Successfully
            </h2>

            <p className="text-gray-600">
              Management has been notified.
            </p>
          </div>
        )}

      </div>
    </main>
  )
}