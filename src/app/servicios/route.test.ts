import { describe, expect, it } from "vitest";
import { generateMetadata, generateStaticParams } from "./[slug]/page";

describe("service detail routes", () => {
  it("generates one static route for every service", () => {
    const params = generateStaticParams();

    expect(params).toContainEqual({ slug: "web-informativa" });
    expect(params).toContainEqual({ slug: "catalogo-digital" });
    expect(params).toHaveLength(5);
  });

  it("generates metadata from service content", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "web-informativa" }) });

    expect(metadata.title).toBe("Web informativa");
    expect(metadata.description).toContain("presencia online");
    expect(metadata.alternates).toEqual({ canonical: "/servicios/web-informativa" });
  });

  it("returns empty metadata for an unknown service", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "no-existe" }) });

    expect(metadata).toEqual({});
  });
});
