// app/api/whitepaper/download/route.js
import { NextResponse } from "next/server"
import { getWhitepaperById } from "@/services/whitepaper"
import cloudinary from "@/lib/cloudinary"

export async function GET(req) {
  const url = new URL(req.url)
  const token = url.searchParams.get("token")
  if (!token) return new NextResponse("Unauthorized", { status: 401 })

  let payload
  try { payload = JSON.parse(Buffer.from(token, "base64url").toString("utf-8")) } catch {
    return new NextResponse("Bad token", { status: 400 })
  }
  if (!payload?.id || Date.now() > Number(payload.exp)) {
    return new NextResponse("Expired", { status: 401 })
  }

  const wp = await getWhitepaperById(payload.id)
  if (!wp?.pdf?.public_id) return new NextResponse("Not Found", { status: 404 })

  const signedUrl = cloudinary.utils.private_download_url(
    wp.pdf.public_id,
    "pdf",
    { resource_type: "raw", expires_at: Math.floor(Date.now()/1000) + 60 }
  )
  return NextResponse.redirect(signedUrl, { status: 302 })
}
