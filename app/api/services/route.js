// app/api/services/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { DATABASE_CONFIG } from "@/lib/config";
import cloudinary from "@/lib/cloudinary";
import { fileToBuffer, bufferToDataURI } from "@/lib/files";
import { createService } from "@/lib/services/service";

// --- GET: List all services (for your frontend table) ---
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_CONFIG.DB_NAME);
    const services = await db
      .collection(DATABASE_CONFIG.COLLECTIONS.SERVICES)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return new Response(JSON.stringify(services), { status: 200 });
  } catch (e) {
    console.error('GET SERVICES ERROR:', e.message);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// --- POST: Create a new service, with images uploaded to Cloudinary ---
export async function POST(req) {
  try {
    console.log('🚀 Starting service creation...');
    const form = await req.formData();

    // Main fields
    const name = String(form.get("name") || "");
    const slug = String(form.get("slug") || "");
    const title = String(form.get("title") || "");
    const subtitle = String(form.get("subtitle") || "");
    const bannerImageFile = form.get("bannerImage");

    //! console.log('📝 Basic fields:', { name, slug, title, subtitle });
    //! console.log('🖼️ Banner image file:', bannerImageFile ? 'File received' : 'No file');

    // Validate required fields
    if (!name || !slug) {
      console.log('❌ Missing name or slug');
      return NextResponse.json({ error: "Missing required fields: name and slug" }, { status: 400 });
    }

    // Validate banner image file
    if (!bannerImageFile || typeof bannerImageFile !== "object" || !bannerImageFile.size || bannerImageFile.size === 0) {
      console.log('❌ Invalid banner image file');
      return NextResponse.json({ error: "Banner image is required and must be a valid file" }, { status: 400 });
    }

    console.log('✅ Validation passed, uploading banner image...');

    // Upload banner image to Cloudinary
    const buf = await fileToBuffer(bannerImageFile);
    const uri = bufferToDataURI(buf, bannerImageFile.type || "image/jpeg");
    const bannerRes = await cloudinary.uploader.upload(uri, {
      folder: "services/banner",
      resource_type: "image"
    });

    //! console.log('✅ Banner image uploaded:', bannerRes.secure_url);

    // Parse industries
    const industries = [];
    for (let i = 0; ; i++) {
      if (!form.has(`industries[${i}][name]`)) break;
      industries.push({
        name: form.get(`industries[${i}][name]`),
        detail: form.get(`industries[${i}][detail]`),
      });
    }
    console.log('📋 Industries parsed:', industries.length);

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
      console.log('🖼️ Uploading OG image...');
      const buf = await fileToBuffer(ogImageFile);
      const uri = bufferToDataURI(buf, ogImageFile.type || "image/jpeg");
      const ogImgRes = await cloudinary.uploader.upload(uri, {
        folder: "services/opengraph",
        resource_type: "image"
      });
      seo.openGraph.image = ogImgRes.secure_url;
      console.log('✅ OG image uploaded:', ogImgRes.secure_url);
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
      if (subImageFile && typeof subImageFile === "object" && subImageFile.size > 0) {
        console.log(`🖼️ Uploading subservice ${i} image...`);
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
        //! console.log(`✅ Subservice ${i} image uploaded:`, subImgRes.secure_url);
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
    console.log('📋 Subservices parsed:', subservices.length);

    // Build final document
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
      subservices,
      seo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('💾 Saving to database...');
    const { id } = await createService(doc);
    //! console.log('✅ Service created successfully with ID:', id);
    
    return NextResponse.json({ ...doc, _id: id }, { status: 201 });

  } catch (e) {
    console.error('💥 SERVICE CREATE ERROR:', e.message);
    console.error('Stack trace:', e.stack);
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 });
  }
}
