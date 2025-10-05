// app/services/[slug]/page.jsx
import ServiceLayout from "@/components/layouts/ServiceLayout";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://your-domain.com"}/api/services/${params.slug}`,
    { cache: "no-store" }
  );
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
      canonical: `/services/${params.slug}`,
    },
  };
}

// Use server-side fetching for best SEO & perf
export default async function ServicePage({ params }) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/services/${params.slug}`, { cache: "no-store" });
  const res = await fetch(`${process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""}/api/services/${params.slug}`, { cache: "no-store" });

  if (!res.ok) return notFound();
  const service = await res.json();

  // Transform your DB object to props expected by ServiceLayout
  const heroData = {
    title: service.title || service.name,
    description: service.subtitle,
    // ...add fields as needed
  };
  // Convert subservices to your previous servicesData format
  const servicesData = (service.subservices || []).map(sub => ({
    title: sub.name,
    description: sub.description,
    bullets: sub.keyPoints,
    image: {
      src: sub.image?.secure_url || "https://via.placeholder.com/600x800",
      alt: sub.image?.alt || sub.name,
    },
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
