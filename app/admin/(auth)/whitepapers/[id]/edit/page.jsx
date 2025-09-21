// app/admin/whitepapers/[id]/edit/page.jsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EditWhitepaperPage() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`/api/whitepaper/${id}`)
        if (!res.ok) throw new Error("Load failed")
        setItem(await res.json())
      } catch {
        toast.error("Failed to load")
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  const onSubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const loadingToast = toast.loading("Saving...")
    try {
      const res = await fetch(`/api/whitepaper/${id}`, { method: "POST", body: fd })
      if (!res.ok) throw new Error("Save failed")
      toast.success("Saved")
      window.location.href = "/admin/whitepapers"
    } catch {
      toast.error("Failed to save")
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  if (loading) return <div className="p-6">Loading...</div>
  if (!item) return <div className="p-6">Not found</div>

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Whitepaper</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <Input name="title" defaultValue={item.title} required />
        <Input name="slug" defaultValue={item.slug} required />
        <Textarea name="description" defaultValue={item.description} required />
        <div className="grid gap-2">
          <label className="text-sm">Replace PDF (optional)</label>
          <Input type="file" name="pdf" accept="application/pdf" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Replace Thumbnail (optional)</label>
          <Input type="file" name="thumb" accept="image/*" />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}
