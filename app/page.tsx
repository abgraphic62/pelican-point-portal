import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl text-center">

        <h1 className="text-4xl font-bold mb-4">
          Pelican Point East
        </h1>

        <p className="text-gray-600 mb-8">
          Condo Owners Portal
        </p>

        <Link
          href="/owners"
          className="block w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition mb-4"
        >
          Submit Away Notice
        </Link>

        <Link
          href="/admin-login"
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Admin Login
        </Link>

      </div>

    </main>
  )
}