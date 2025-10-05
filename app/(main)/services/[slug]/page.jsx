import ServiceLayout from "@/components/layouts/ServiceLayout";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  // Correctly await params for Next.js 15+
  const { slug } = await params;
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://your-domain.com"; // <-- change as needed!
  const res = await fetch(`${baseUrl}/api/services/${slug}`, { cache: "no-store" });
  if (!res.ok) return {};
  const service = await res.json();
  const seo = service.seo || {};

  return {
    title: seo.title || service.title || service.name,
    description: seo.description || service.subtitle,
    keywords: seo.keywords || "",
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      images: [seo.openGraph?.image].filter(Boolean),
      url: seo.openGraph?.url || "",
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }) {
  // Correctly await params for Next.js 15+
  const { slug } = await params;
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://your-domain.com"; // <-- change as needed!
  const res = await fetch(`${baseUrl}/api/services/${slug}`, { cache: "no-store" });
  if (!res.ok) return notFound();
  const service = await res.json();

  // Prepare props in your expected ServiceLayout format
  const heroData = {
    title: service.title || service.name,
    description: service.subtitle,
    slug: service.slug,  // so your "Read More" links work!
    bannerImage: service.bannerImage || null,
  };
  const servicesData = (service.subservices || []).map(sub => ({
    title: sub.name,
    description: sub.description,
    bullets: sub.keyPoints || [],
    slug: sub.slug,
    image: {
      src: sub.image?.secure_url || "",
      alt: sub.image?.alt || sub.name,
    }
  }));
  const industriesData = service.industries || [];

  return (
    <ServiceLayout
      heroData={heroData}
      servicesData={servicesData}
      industriesData={industriesData}
    />
  );
}
