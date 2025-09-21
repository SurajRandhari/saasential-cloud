// app/api/whitepaper/lead/route.js
import { NextResponse } from "next/server"
import { createDownload, getWhitepaperById } from "@/lib/services/whitepaper"

function makeToken(payload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url")
}

export async function POST(req) {
  const form = await req.formData()
  const name = String(form.get("name") || "")
  const email = String(form.get("email") || "")
  const company = String(form.get("company") || "")  // Add company field
  const whitepaperId = String(form.get("whitepaperId") || "")

  if (!name || !email || !whitepaperId) {  // company is optional
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const wp = await getWhitepaperById(whitepaperId)
  if (!wp) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await createDownload({ name, email, company, whitepaperId, whitepaperTitle: wp.title })  // Include company

  const token = makeToken({ id: whitepaperId, exp: Date.now() + 15 * 60 * 1000 })
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/api/whitepaper/download?token=${token}`
  return NextResponse.json({ ok: true, link })
}
