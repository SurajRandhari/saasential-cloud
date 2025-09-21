// app/whitepaper/page.jsx
// import { listWhitepapers } from "../../../services/whitepaper" // or "@/services/whitepaper" if alias works

import { listWhitepapers } from "@/lib/services/whitepaper"

export default async function WhitepaperHub() {
  // Direct service call - no HTTP needed
  const items = await listWhitepapers()
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Whitepaper Hub</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((w) => (
          <div key={w._id} className="border rounded overflow-hidden">
            <div className="aspect-[16/9] bg-muted" style={{ backgroundImage: `url(${w.thumb?.secure_url})`, backgroundSize: "cover" }} />
            <div className="p-4">
              <div className="font-medium">{w.title}</div>
              <p className="text-sm text-muted-foreground line-clamp-2">{w.description}</p>
              <a href={`/whitepaper/${w.slug}`} className="mt-3 inline-block px-3 py-2 rounded bg-primary text-primary-foreground">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
