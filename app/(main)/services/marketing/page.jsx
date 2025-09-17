import ServiceLayout from "@/components/layouts/ServiceLayout";
import {
  marketingHeroData,
  marketingServicesData,
  marketingIndustriesData,
  marketingSEO
} from "@/data/services/marketing";

export async function generateMetadata() {
  return {
    title: marketingSEO.title,
    description: marketingSEO.description,
    keywords: marketingSEO.keywords.join(", "),
    openGraph: {
      title: marketingSEO.openGraph.title,
      description: marketingSEO.openGraph.description,
      images: [marketingSEO.openGraph.image],
      url: marketingSEO.openGraph.url,
    },
    alternates: {
      canonical: `/services/marketing`,
    },
  };
}

const MarketingPage = () => {
  return (
    <ServiceLayout
      heroData={marketingHeroData}
      servicesData={marketingServicesData}
      industriesData={marketingIndustriesData}
    />
  );
};

export default MarketingPage;
