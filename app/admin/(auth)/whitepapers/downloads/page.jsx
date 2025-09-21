// app/admin/whitepapers/downloads/page.jsx
import { listDownloads } from "@/lib/services/whitepaper"

export default async function DownloadRecordsPage() {
  const rows = await listDownloads()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Download Records</h1>
      <div className="overflow-x-auto">
        <table className="w-full border rounded">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Company</th>
              <th className="text-left p-2">Whitepaper</th>
              <th className="text-left p-2">Downloaded At</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.email}</td>
                <td className="p-2">{r.company || '-'}</td>
                <td className="p-2">{r.whitepaperTitle}</td>
                <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
