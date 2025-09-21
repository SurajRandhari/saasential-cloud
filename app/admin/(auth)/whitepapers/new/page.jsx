// app/admin/whitepapers/new/page.jsx
"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function NewWhitepaperPage() {
  const [pending, setPending] = useState(false)
  const onSubmit = async (e) => {
    e.preventDefault()
    setPending(true)
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/whitepaper", { method: "POST", body: fd })
      if (!res.ok) throw new Error("Save failed")
      toast.success("Whitepaper created")
      window.location.href = "/admin/whitepapers"
    } catch {
      toast.error("Failed to create")
    } finally {
      setPending(false)
    }
  }
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Create Whitepaper</h1>
      <form onSubmit={onSubmit} className="grid gap-4">
        <Input name="title" placeholder="Title" required />
        <Input name="slug" placeholder="slug-e-g-ai-trends-2025" required />
        <Textarea name="description" placeholder="Short description" required />
        <div className="grid gap-2">
          <label className="text-sm">PDF file</label>
          <Input type="file" name="pdf" accept="application/pdf" required />
        </div>
        <div className="grid gap-2">
          <label className="text-sm">Thumbnail image</label>
          <Input type="file" name="thumb" accept="image/*" required />
        </div>
        <Button disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
      </form>
    </div>
  )
}
