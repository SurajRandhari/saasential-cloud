// app/api/services/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { DATABASE_CONFIG } from "@/lib/config";
import cloudinary from "@/lib/cloudinary";
import { fileToBuffer, bufferToDataURI } from "@/lib/files";
import { createService } from "@/lib/services/service";

// --- GET: List all services (for your frontend table) ---
export async function GET() {
  const client = await clientPromise;
  const db = client.db(DATABASE_CONFIG.DB_NAME);
  const services = await db
    .collection(DATABASE_CONFIG.COLLECTIONS.SERVICES)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return new Response(JSON.stringify(services), { status: 200 });
}

// --- POST: Create a new service, with images uploaded to Cloudinary ---
export async function POST(req) {
  try {
    const form = await req.formData();

    // Main fields
    const name = String(form.get("name") || "");
    const slug = String(form.get("slug") || "");
    const title = String(form.get("title") || "");
    const subtitle = String(form.get("subtitle") || "");
    const bannerImageFile = form.get("bannerImage");

    if (!name || !slug || !bannerImageFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upload banner image to Cloudinary
    const buf = await fileToBuffer(bannerImageFile);
    const uri = bufferToDataURI(buf, bannerImageFile.type || "image/jpeg");
    const bannerRes = await cloudinary.uploader.upload(uri, {
      folder: "services/banner",
      resource_type: "image"
    });

    // Parse industries
    const industries = [];
    for (let i = 0; ; i++) {
      if (!form.has(`industries[${i}][name]`)) break;
      industries.push({
        name: form.get(`industries[${i}][name]`),
        detail: form.get(`industries[${i}][detail]`),
      });
    }

    // Parse SEO & OpenGraph
    const seo = {
      title: String(form.get("seoTitle") || ""),
      description: String(form.get("seoDescription") || ""),
      keywords: String(form.get("seoKeywords") || ""),
      openGraph: {
        title: String(form.get("ogTitle") || ""),
        description: String(form.get("ogDescription") || ""),
        image: "",
        url: String(form.get("ogUrl") || ""),
      }
    };
    // Upload OpenGraph image if provided
    const ogImageFile = form.get("ogImage");
    if (ogImageFile && typeof ogImageFile === "object" && ogImageFile.size > 0) {
      const buf = await fileToBuffer(ogImageFile);
      const uri = bufferToDataURI(buf, ogImageFile.type || "image/jpeg");
      const ogImgRes = await cloudinary.uploader.upload(uri, {
        folder: "services/opengraph",
        resource_type: "image"
      });
      seo.openGraph.image = ogImgRes.secure_url;
    }

    // Parse subservices (handle repeated groups)
    const subservices = [];
    let i = 0;
    while (form.has(`subservices[${i}][name]`)) {
      const subName = form.get(`subservices[${i}][name]`);
      const subSlug = form.get(`subservices[${i}][slug]`);
      const subDesc = form.get(`subservices[${i}][description]`);
      const subKeyPoints = (form.get(`subservices[${i}][keyPoints]`) || "").split("\n");
      const subImageFile = form.get(`subservices[${i}][image]`);
      const subAlt = form.get(`subservices[${i}][imageAlt]`);
      const subDetails = form.get(`subservices[${i}][details]`);

      let subImage = {};
      if (subImageFile && typeof subImageFile === "object") {
        const sbuf = await fileToBuffer(subImageFile);
        const suri = bufferToDataURI(sbuf, subImageFile.type || "image/jpeg");
        const subImgRes = await cloudinary.uploader.upload(suri, {
          folder: "services/subservices",
          resource_type: "image"
        });
        subImage = {
          public_id: subImgRes.public_id,
          secure_url: subImgRes.secure_url,
          width: subImgRes.width,
          height: subImgRes.height,
          format: subImgRes.format,
          alt: subAlt || "",
        };
      }

      subservices.push({
        name: subName,
        slug: subSlug,
        description: subDesc,
        keyPoints: subKeyPoints,
        image: subImage,
        details: subDetails,
      });
      i++;
    }

    const doc = {
      name,
      slug,
      bannerImage: {
        public_id: bannerRes.public_id,
        secure_url: bannerRes.secure_url,
        width: bannerRes.width,
        height: bannerRes.height,
        format: bannerRes.format,
      },
      title,
      subtitle,
      industries,
      subservices, // Complete array with image meta!
      seo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { id } = await createService(doc);
    return NextResponse.json({ ...doc, _id: id }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
