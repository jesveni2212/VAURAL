import type { MetadataRoute } from "next";
import { getServices } from "@/data/services";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceUrls = getServices().map((service) => ({
    url: `${siteConfig.url}/servicios/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    ...serviceUrls,
  ];
}
