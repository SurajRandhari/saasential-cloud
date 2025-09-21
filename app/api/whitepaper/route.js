// app/api/whitepaper/route.js
import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"
import { fileToBuffer, bufferToDataURI } from "@/lib/files"
import { createWhitepaper, listWhitepapers } from "@/lib/services/whitepaper"
// import { createWhitepaper, listWhitepapers } from "@/services/whitepaper"

export async function GET() {
  const items = await listWhitepapers()
  return NextResponse.json(items)
}

export async function POST(req) {
  try {
    const form = await req.formData()
    const title = String(form.get("title") || "")
    const slug = String(form.get("slug") || "")
    const description = String(form.get("description") || "")
    const thumb = form.get("thumb")
    const pdf = form.get("pdf")

    if (!title || !slug || !description || !thumb || !pdf) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    // Cloudinary uploads
    const thumbBuf = await fileToBuffer(thumb)
    const thumbURI = bufferToDataURI(thumbBuf, thumb.type || "image/jpeg")
    const thumbRes = await cloudinary.uploader.upload(thumbURI, {
      folder: "whitepapers/thumbs",
      resource_type: "image",
    })

    const pdfBuf = await fileToBuffer(pdf)
    const pdfURI = bufferToDataURI(pdfBuf, pdf.type || "application/pdf")
    const pdfRes = await cloudinary.uploader.upload(pdfURI, {
      folder: "whitepapers/pdfs",
      resource_type: "raw",
      use_filename: true,
      unique_filename: true,
    })

    const doc = {
      title,
      slug,
      description,
      thumb: {
        public_id: thumbRes.public_id,
        secure_url: thumbRes.secure_url,
        width: thumbRes.width,
        height: thumbRes.height,
        format: thumbRes.format,
      },
      pdf: {
        public_id: pdfRes.public_id,
        secure_url: pdfRes.secure_url,
        bytes: pdfRes.bytes,
        format: pdfRes.format,
        resource_type: pdfRes.resource_type,
      },
    }

    const { id } = await createWhitepaper(doc)
    return NextResponse.json({ ...doc, _id: id }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 })
  }
}
