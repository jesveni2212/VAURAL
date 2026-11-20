import { describe, expect, it } from "vitest";
import nextConfig from "../../../next.config";
import { generateMetadata, generateStaticParams } from "./[slug]/page";

describe("service detail routes", () => {
  it("generates one static route for every pillar", () => {
    const params = generateStaticParams();

    expect(params).toContainEqual({ slug: "paginas-web" });
    expect(params).toContainEqual({ slug: "marketing-digital" });
    expect(params).toHaveLength(4);
  });

  it("generates metadata from pillar content", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "paginas-web" }) });

    expect(metadata.title).toBe("Páginas web");
    expect(metadata.alternates).toEqual({ canonical: "/servicios/paginas-web" });
  });

  it("returns empty metadata for an unknown service", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "no-existe" }) });

    expect(metadata).toEqual({});
  });

  it("permanently redirects the previous service URLs to their pillar", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];

    expect(redirects).toContainEqual({ source: "/servicios/web-informativa", destination: "/servicios/paginas-web", permanent: true });
    expect(redirects).toContainEqual({ source: "/servicios/catalogo-digital", destination: "/servicios/paginas-web", permanent: true });
    expect(redirects).toContainEqual({ source: "/servicios/contenido-redes", destination: "/servicios/contenido-para-redes", permanent: true });
    expect(redirects).toHaveLength(5);
  });
});
