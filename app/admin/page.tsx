
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminPage() {
  const [notices, setNotices] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [hideReturned, setHideReturned] = useState(false)
  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    const { data, error } = await supabase
      .from('away_notices')
      .select('*')
      .eq('archived', false)
      .order('created_at', { ascending: false })

    console.log(data)
    console.log(error)

    if (data) {
      setNotices(data)
    }
  }
  const archiveNotice = async (id: number) => {
    await supabase
      .from('away_notices')
      .update({
        archived: true,
      })
      .eq('id', id)
  
    fetchNotices()
  }
  const deleteNotice = async (id: number) => {
    await supabase
      .from('away_notices')
      .delete()
      .eq('id', id)
  
    fetchNotices()
  }
  const toggleStatus = async (
    id: number,
    currentStatus: string
  ) => {
    const newStatus =
      currentStatus === 'Away'
        ? 'Returned'
        : 'Away'
  
    await supabase
      .from('away_notices')
      .update({
        status: newStatus,
      })
      .eq('id', id)
  
    fetchNotices()
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-xl shadow">

      <h1 className="text-2xl md:text-4xl font-bold mb-8">
      <div className="flex gap-4 mb-6">

<a
  href="/admin"
  className="bg-blue-600 text-white px-3 py-1 text-sm rounded-xl"
>
  Active Notices
</a>

<a
  href="/admin/archive"
  className="bg-gray-300 px-3 py-1 text-sm rounded-xl"
>
  Archived Notices
</a>

</div>
Pelican Point East Dashboard
        </h1>
        <input
  type="text"
  placeholder="Search by condo or owner..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border p-4 rounded-xl mb-6"
/><label className="flex items-center gap-2 mb-6">

<input
  type="checkbox"
  checked={hideReturned}
  onChange={() =>
    setHideReturned(!hideReturned)
  }
/>

Hide Returned Notices

</label><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

<div className="bg-blue-100 p-4 rounded-xl">
  <p className="text-sm text-gray-600">
    Active Away
  </p>

  <p className="text-2xl font-semibold">
    {
      notices.filter(
        (n) => n.status !== 'Returned'
      ).length
    }
  </p>
</div>

<div className="bg-green-100 p-4 rounded-xl">
  <p className="text-sm text-gray-600">
    Returned
  </p>

  <p className="text-2xl font-semibold">
    {
      notices.filter(
        (n) => n.status === 'Returned'
      ).length
    }
  </p>
</div>

<div className="bg-gray-100 p-4 rounded-xl">
  <p className="text-sm text-gray-600">
    Total Notices
  </p>

  <p className="text-2xl font-semibold">
    {notices.length}
  </p>
</div>

</div>
        <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden text-sm md:text-base">

        <thead className="sticky top-0">
              <tr className="bg-gray-200 text-left">
                <th className="p-4 border">Unit</th>
                <th className="p-4 border">Name</th>
                <th className="p-4 border">From</th>
                <th className="p-4 border">To</th>
                <th className="p-4 border">Notes</th>
                <th className="p-4 border">Status</th>
                <th className="p-4 border">Submitted</th>
                <th className="p-4 border">Action</th>
              </tr>
            </thead>

            <tbody>
            {notices
 .filter((notice) => {

    if (
        hideReturned &&
      notice.status === 'Returned'
    ) {
      return false
    }
  
    return (
      notice.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
  
      notice.condo
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
  })
  .map((notice) => (
    <tr
    key={notice.id}
    className="
      hover:bg-blue-50
      odd:bg-white
      even:bg-gray-50
    "
  >

                  <td className="p-4 border font-bold">
                    {notice.condo}
                  </td>

                  <td className="p-4 border">
                    {notice.name}
                  </td>

                  <td className="p-4 border">
                    {notice.from_date || '-'}
                  </td>

                  <td className="p-4 border">
                    {notice.to_date || '-'}
                  </td>

                  <td className="p-4 border">
                    {notice.notes || '-'}
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
<td className="p-4 border">

  {new Date(
    notice.created_at
  ).toLocaleDateString()}

</td>
<td className="p-4 border space-x-2">

  <button
    onClick={() =>
      toggleStatus(
        notice.id,
        notice.status
      )
    }
    className="bg-blue-500 text-white px-4 py-2 rounded"
  >
   <>
  <span className="italic text-sm">
    Mark
  </span>{' '}

  <span className="font-bold">
    {notice.status === 'Away'
      ? 'Returned'
      : 'Away'}
  </span>
</>
  </button>

  <button
    onClick={() => {
        const confirmed = window.confirm(
          'Are you sure you want to archive this notice?'
        )
      
        if (confirmed) {
            archiveNotice(notice.id)
        }
      }}
    className="bg-red-500 text-white px-4 py-2 rounded"
  >
    Archive
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