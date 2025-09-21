// app/api/whitepaper/[id]/route.js
import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { fileToBuffer, bufferToDataURI } from "@/lib/files"
import {
  getWhitepaperById,
  updateWhitepaper,
  deleteWhitepaper,
} from "@/lib/services/whitepaper"

export async function GET(req, { params }) {
  const doc = await getWhitepaperById(params.id)
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(doc)
}

export async function POST(req, { params }) {
  const form = await req.formData()
  const title = form.get("title")
  const slug = form.get("slug")
  const description = form.get("description")
  const pdf = form.get("pdf")
  const thumb = form.get("thumb")

  const current = await getWhitepaperById(params.id)
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const update = {}
  if (title) update.title = String(title)
  if (slug) update.slug = String(slug)
  if (description) update.description = String(description)

  if (thumb && typeof thumb === "object") {
    try {
      if (current.thumb?.public_id) {
        await cloudinary.uploader.destroy(current.thumb.public_id, { resource_type: "image" })
      }
    } catch {}
    const buf = await fileToBuffer(thumb)
    const uri = bufferToDataURI(buf, thumb.type || "image/jpeg")
    const res = await cloudinary.uploader.upload(uri, {
      folder: "whitepapers/thumbs",
      resource_type: "image",
    })
    update.thumb = {
      public_id: res.public_id,
      secure_url: res.secure_url,
      width: res.width,
      height: res.height,
      format: res.format,
    }
  }

  if (pdf && typeof pdf === "object") {
    try {
      if (current.pdf?.public_id) {
        await cloudinary.uploader.destroy(current.pdf.public_id, { resource_type: "raw" })
      }
    } catch {}
    const buf = await fileToBuffer(pdf)
    const uri = bufferToDataURI(buf, pdf.type || "application/pdf")
    const res = await cloudinary.uploader.upload(uri, {
      folder: "whitepapers/pdfs",
      resource_type: "raw",
      use_filename: true,
      unique_filename: true,
    })
    update.pdf = {
      public_id: res.public_id,
      secure_url: res.secure_url,
      bytes: res.bytes,
      format: res.format,
      resource_type: res.resource_type,
    }
  }

  const result = await updateWhitepaper(params.id, update)
  if (!result.success) return NextResponse.json({ error: "Update failed" }, { status: 500 })
  const updated = await getWhitepaperById(params.id)
  return NextResponse.json(updated)
}

export async function DELETE(req, { params }) {
  const current = await getWhitepaperById(params.id)
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 })

  try {
    if (current.thumb?.public_id) {
      await cloudinary.uploader.destroy(current.thumb.public_id, { resource_type: "image" })
    }
  } catch {}
  try {
    if (current.pdf?.public_id) {
      await cloudinary.uploader.destroy(current.pdf.public_id, { resource_type: "raw" })
    }
  } catch {}

  const result = await deleteWhitepaper(params.id)
  if (!result.success) return NextResponse.json({ error: "Delete failed" }, { status: 500 })
  return NextResponse.json({ ok: true })
}
