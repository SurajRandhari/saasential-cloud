import ServiceLayout from "@/components/layouts/ServiceLayout";
import {
  experienceDesignHeroData,
  experienceDesignServicesData,
  experienceDesignIndustriesData,
  experienceDesignSEO
} from "@/data/services/experience-design";

export async function generateMetadata() {
  return {
    title: experienceDesignSEO.title,
    description: experienceDesignSEO.description,
    keywords: experienceDesignSEO.keywords.join(", "),
    openGraph: {
      title: experienceDesignSEO.openGraph.title,
      description: experienceDesignSEO.openGraph.description,
      images: [experienceDesignSEO.openGraph.image],
      url: experienceDesignSEO.openGraph.url,
    },
    alternates: {
      canonical: `/services/experience-design`,
    },
  };
}

const ExperienceDesignPage = () => {
  return (
    <ServiceLayout
      heroData={experienceDesignHeroData}
      servicesData={experienceDesignServicesData}
      industriesData={experienceDesignIndustriesData}
    />
  );
};

export default ExperienceDesignPage;
