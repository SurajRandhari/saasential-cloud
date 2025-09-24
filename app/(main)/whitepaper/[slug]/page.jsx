// app/whitepaper/[slug]/page.jsx
import { GradientButton } from "@/components/common/my-button/GradientButton"
import { listWhitepapers } from "@/lib/services/whitepaper"
import { notFound } from "next/navigation"

async function getWhitepaper(slug) {
  const items = await listWhitepapers()
  return items.find((w) => w.slug === slug)
}

export default async function WhitepaperLanding({ params }) {
  const wp = await getWhitepaper(params.slug)
  if (!wp) return notFound()
  return (
    <div className="my-28 p-6 grid gap-8 grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-semibold mb-3 ">{wp.title}</h1>
        <p className="text-muted-foreground mb-4 w-3/4">{wp.description}</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Actionable insights and key takeaways</li>
          <li>Trends, challenges, and solutions</li>
          <li>Frameworks and checklists to implement</li>
        </ul>
      </div>
      <div className="lg:col-span-1">
        <form action="/api/whitepaper/lead" method="POST" className="border rounded p-4 grid gap-3">
          <input type="hidden" name="whitepaperId" value={wp._id} />
          <div className="grid gap-1">
            <label className="text-sm">Name</label>
            <input name="name" required className="border rounded px-3 py-2" />
          </div>
          <div className="grid gap-1">
            <label className="text-sm">Email</label>
            <input name="email" type="email" required className="border rounded px-3 py-2" />
          </div>
          <div className="grid gap-1">
            <label className="text-sm">Company</label>
            <input name="company" placeholder="Optional" className="border rounded px-3 py-2" />
          </div>
          {/* <button className="mt-2 px-3 py-2 rounded bg-primary text-primary-foreground">Download Now</button> */}
          <GradientButton type="submit" className="w-fit ">Download Now</GradientButton>
          <p className="text-xs text-muted-foreground">By submitting, consent to receive the download link by email.</p>
        </form>
      </div>
    </div>
  )
}
