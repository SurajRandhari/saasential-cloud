// import clientPromise from '@/lib/mongodb'
// import { DATABASE_CONFIG } from '@/lib/config'

// export async function GET(request, { params }) {
//   const { slug } = params;
//   const client = await clientPromise;
//   const db = client.db(DATABASE_CONFIG.DB_NAME);
//   const service = await db.collection(DATABASE_CONFIG.COLLECTIONS.SERVICES).findOne({ slug });
//   if (!service) return new Response('Not found', { status: 404 });
//   return new Response(JSON.stringify(service), { status: 200 });
// }

// export async function PUT(request, { params }) {
//   const { slug } = params;
//   const data = await request.json();
//   const client = await clientPromise;
//   const db = client.db(DATABASE_CONFIG.DB_NAME);
//   const result = await db.collection(DATABASE_CONFIG.COLLECTIONS.SERVICES).updateOne({ slug }, { $set: data });
//   if (result.matchedCount === 0) return new Response('Not found', { status: 404 });
//   return new Response(JSON.stringify(result), { status: 200 });
// }

// export async function DELETE(request, { params }) {
//   const { slug } = params;
//   const client = await clientPromise;
//   const db = client.db(DATABASE_CONFIG.DB_NAME);
//   const result = await db.collection(DATABASE_CONFIG.COLLECTIONS.SERVICES).deleteOne({ slug });
//   if (result.deletedCount === 0) return new Response('Not found', { status: 404 });
//   return new Response(null, { status: 204 });
// }


import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { fileToBuffer, bufferToDataURI } from "@/lib/files";
import clientPromise from "@/lib/mongodb";
import { DATABASE_CONFIG } from "@/lib/config";

export async function GET(request, { params }) {
  const { slug } = await params;
  const client = await clientPromise;
  const db = client.db(DATABASE_CONFIG.DB_NAME);
  const service = await db.collection(DATABASE_CONFIG.COLLECTIONS.SERVICES).findOne({ slug });
  if (!service) return new Response("Not found", { status: 404 });
  return new Response(JSON.stringify(service), { status: 200 });
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db(DATABASE_CONFIG.DB_NAME);

    // Fetch old document (for existing images/public_id)
    const current = await db.collection(DATABASE_CONFIG.COLLECTIONS.SERVICES).findOne({ slug });
    if (!current) return new Response('Not found', { status: 404 });

    // Parse form data
    const form = await request.formData();
    // Gather fields (update logic similar to your create)
    const name = form.get("name");
    const title = form.get("title");
    const subtitle = form.get("subtitle");
    const ns = form.get("seoTitle");
    const ds = form.get("seoDescription");
    const ks = form.get("seoKeywords");
    const ogTitle = form.get("ogTitle");
    const ogDesc = form.get("ogDescription");
    const ogUrl = form.get("ogUrl");

    // Banner image (check for new file, otherwise keep old)
    let bannerImage = current.bannerImage;
    const bannerImgFile = form.get("bannerImage");
    if (bannerImgFile && typeof bannerImgFile === "object" && bannerImgFile.size > 0) {
      // Optional: delete old from Cloudinary if you want
      const buf = await fileToBuffer(bannerImgFile);
      const uri = bufferToDataURI(buf, bannerImgFile.type || "image/jpeg");
      const res = await cloudinary.uploader.upload(uri, {
        folder: "services/banner",
        resource_type: "image"
      });
      bannerImage = {
        public_id: res?.public_id,
        secure_url: res.secure_url,
        width: res.width,
        height: res.height,
        format: res.format,
      };
    }

    // OpenGraph image
    let ogImage = current?.seo?.openGraph?.image || null;
    const ogImgFile = form.get("ogImage");
    if (ogImgFile && typeof ogImgFile === "object" && ogImgFile.size > 0) {
      const buf = await fileToBuffer(ogImgFile);
      const uri = bufferToDataURI(buf, ogImgFile.type || "image/jpeg");
      const res = await cloudinary.uploader.upload(uri, {
        folder: "services/opengraph",
        resource_type: "image"
      });
      ogImage = res.secure_url;
    }

    // Parse industries (if present)
    const industries = [];
    for (let i = 0; ; i++) {
      if (!form.has(`industries[${i}][name]`)) break;
      industries.push({
        name: form.get(`industries[${i}][name]`),
        detail: form.get(`industries[${i}][detail]`),
      });
    }

    // Parse subservices (handle each subservice image)
    const subservices = [];
    for (let i = 0; ; i++) {
      if (!form.has(`subservices[${i}][name]`)) break;
      let subImage = current?.subservices?.[i]?.image || {};
      const subImgFile = form.get(`subservices[${i}][image]`);
      if (subImgFile && typeof subImgFile === "object" && subImgFile.size > 0) {
        const sbuf = await fileToBuffer(subImgFile);
        const suri = bufferToDataURI(sbuf, subImgFile.type || "image/jpeg");
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
          alt: form.get(`subservices[${i}][imageAlt]`) || "",
        };
      }
      subservices.push({
        name: form.get(`subservices[${i}][name]`),
        slug: form.get(`subservices[${i}][slug]`),
        description: form.get(`subservices[${i}][description]`),
        keyPoints: (form.get(`subservices[${i}][keyPoints]`) || "").split("\n"),
        image: subImage,
        details: form.get(`subservices[${i}][details]`) || "",
      });
    }

    // Build updated document
    const update = {
      name,
      slug,
      bannerImage,
      title,
      subtitle,
      industries,
      subservices,
      seo: {
        title: ns,
        description: ds,
        keywords: ks,
        openGraph: {
          title: ogTitle,
          description: ogDesc,
          image: ogImage,
          url: ogUrl,
        },
      },
      updatedAt: new Date(),
    };

    const result = await db.collection(DATABASE_CONFIG.COLLECTIONS.SERVICES)
      .updateOne({ slug }, { $set: update });

    if (result.matchedCount === 0) return new Response('Not found', { status: 404 });
    return new NextResponse(JSON.stringify(update), { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  const client = await clientPromise;
  const db = client.db(DATABASE_CONFIG.DB_NAME);
  const result = await db.collection(DATABASE_CONFIG.COLLECTIONS.SERVICES).deleteOne({ slug });
  if (result.deletedCount === 0) return new Response('Not found', { status: 404 });
  return new Response(null, { status: 204 });
}
