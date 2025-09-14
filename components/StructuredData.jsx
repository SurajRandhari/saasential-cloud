// components/StructuredData.jsx
export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Saasential",
    "description": "Comprehensive business solutions from software to strategy",
    "url": "https://yourwebsite.com",
    "logo": "https://yourwebsite.com/logo.png",
    "sameAs": [
      "https://linkedin.com/company/saasential",
      "https://twitter.com/saasential"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-000-000-0000",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "service": [
      {
        "@type": "Service",
        "name": "Software Development",
        "description": "Custom software solutions for business growth"
      },
      {
        "@type": "Service", 
        "name": "Strategic Consulting",
        "description": "Business strategy and digital transformation"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
