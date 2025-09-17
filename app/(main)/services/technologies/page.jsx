import ServiceLayout from "@/components/layouts/ServiceLayout";
import { 
  technologiesHeroData,
  technologiesServicesData, 
  technologiesIndustriesData,
  technologiesSEO 
} from "@/data/services/technologies";

export async function generateMetadata() {
  return {
    title: technologiesSEO.title,
    description: technologiesSEO.description,
    keywords: technologiesSEO.keywords.join(", "),
    openGraph: {
      title: technologiesSEO.openGraph.title,
      description: technologiesSEO.openGraph.description,
      images: [technologiesSEO.openGraph.image],
      url: technologiesSEO.openGraph.url,
    },
    alternates: {
      canonical: `/services/technologies`,
    },
  };
}

const TechnologiesPage = () => {
  return (
    <ServiceLayout 
      heroData={technologiesHeroData}
      servicesData={technologiesServicesData}
      industriesData={technologiesIndustriesData}
    />
  );
};

export default TechnologiesPage;
