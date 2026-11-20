import { getServices } from "@/data/services";
import { siteConfig } from "@/data/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  areaServed: { "@type": "Country", name: "Paraguay" },
  serviceType: getServices().map((service) => service.title),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${siteConfig.whatsappNumber}`,
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Planes de VAURAL",
    itemListElement: getServices().map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        url: `${siteConfig.url}/servicios/${service.slug}`,
      },
    })),
  },
};

export function StructuredData() {
  return (
    <script
      id="vaural-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
