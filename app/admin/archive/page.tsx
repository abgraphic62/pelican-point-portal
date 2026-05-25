'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function ArchivePage() {
  const [notices, setNotices] = useState<any[]>([])

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    const { data } = await supabase
      .from('away_notices')
      .select('*')
      .eq('archived', true)
      .order('created_at', {
        ascending: false,
      })

    if (data) {
      setNotices(data)
    }
  }

  const restoreNotice = async (id: number) => {
    await supabase
      .from('away_notices')
      .update({
        archived: false,
      })
      .eq('id', id)

    fetchNotices()
  }

  const deleteNotice = async (id: number) => {
    const confirmed = window.confirm(
      'Delete permanently?'
    )

    if (!confirmed) return

    await supabase
      .from('away_notices')
      .delete()
      .eq('id', id)

    fetchNotices()
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">

      <div className="max-w-6xl mx-auto bg-white p-5 md:p-10 rounded-xl shadow">

        <h1 className="text-2xl md:text-4xl font-bold mb-8">
        <div className="flex gap-4 mb-6">

<a
  href="/admin"
  className="bg-gray-300 px-3 py-1 text-sm rounded-xl"
>
  Active Notices
</a>

<a
  href="/admin/archive"
  className="bg-blue-600 text-white px-3 py-1 text-sm rounded-xl"
>
  Archived Notices
</a>

</div>
          Archived Notices
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse text-sm md:text-base">

            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4 border">
                  Community
                </th>

                <th className="p-4 border">
                  Unit
                </th>

                <th className="p-4 border">
                  Name
                </th>

                <th className="p-4 border">
                  Status
                </th>

                <th className="p-4 border">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {notices.map((notice) => (

                <tr
                  key={notice.id}
                  className="
                    odd:bg-white
                    even:bg-gray-50
                  "
                >

                  <td className="p-4 border">
                    {notice.community}
                  </td>

                  <td className="p-4 border font-bold">
                    {notice.condo}
                  </td>

                  <td className="p-4 border">
                    {notice.name}
                  </td>

                  <td className="p-4 border">

                    <span
                      className={`px-3 py-1 rounded-full text-white font-bold ${
                        notice.status === 'Away'
                          ? 'bg-red-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {notice.status}
                    </span>

                  </td>

                  <td className="p-4 border space-x-2">

                    <button
                      onClick={() =>
                        restoreNotice(notice.id)
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Restore
                    </button>

                    <button
                      onClick={() =>
                        deleteNotice(notice.id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  )
}