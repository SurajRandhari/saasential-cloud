import ServiceLayout from "@/components/layouts/ServiceLayout";
import { notFound } from "next/navigation";

// Always use the same hardcoded base URL
const BASE_URL = "https://saasential-cloud.vercel.app";

function getApiUrl(slug) {
  return `${BASE_URL}/api/services/${slug}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const apiUrl = getApiUrl(slug);
  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) return {};
  const service = await res.json();
  const seo = service?.seo || {};

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
  const { slug } = await params;
  const apiUrl = getApiUrl(slug);
  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) {
    console.error(`Service not found for slug: ${slug}`);
    return notFound();
  }
  const service = await res.json();
  if (!service) return notFound();

  const heroData = {
    title: service.title || service.name || "",
    description: service.subtitle || "",
    slug: service.slug || slug,
    bannerImage: service.bannerImage || null,
  };
  const servicesData = Array.isArray(service.subservices)
    ? service.subservices.map(sub => ({
        title: sub.name || "",
        description: sub.description || "",
        bullets: sub.keyPoints || [],
        slug: sub.slug || "",
        image: {
          src: sub.image?.secure_url || "",
          alt: sub.image?.alt || sub.name || "",
        },
      }))
    : [];
  const industriesData = Array.isArray(service.industries)
    ? service.industries
    : [];

  return (
    <ServiceLayout
      heroData={heroData}
      servicesData={servicesData}
      industriesData={industriesData}
    />
  );
}
