
import ServiceLayout from "@/components/layouts/ServiceLayout";
import { 
  brandingHeroData, 
  brandingServicesData, 
  brandingIndustriesData, 
  brandingSEO 
} from "@/data/services/branding";

export async function generateMetadata() {
  return {
    title: brandingSEO.title,
    description: brandingSEO.description,
    keywords: brandingSEO.keywords.join(", "),
    openGraph: {
      title: brandingSEO.openGraph.title,
      description: brandingSEO.openGraph.description,
      images: [brandingSEO.openGraph.image],
      url: brandingSEO.openGraph.url,
    },
    alternates: {
      canonical: `/services/branding`,
    },
  };
}

const BrandingPage = () => {
  return (
    <ServiceLayout 
      heroData={brandingHeroData}
      servicesData={brandingServicesData}
      industriesData={brandingIndustriesData}
    />
  );
};

export default BrandingPage;