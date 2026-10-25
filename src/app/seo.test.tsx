import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { metadata } from "./layout";
import { GET as getLlms } from "./llms.txt/route";
import NotFound from "./not-found";
import robots from "./robots";
import sitemap from "./sitemap";
import { StructuredData } from "@/components/seo/StructuredData";

describe("SEO foundation", () => {
  it("defines canonical, description and social image metadata", () => {
    expect(metadata.description).toBeTruthy();
    expect(metadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.openGraph).toMatchObject({ images: [{ url: "/opengraph-image" }] });
    expect(metadata.twitter).toMatchObject({ images: ["/opengraph-image"] });
  });

  it("allows crawlers, publishes the sitemap and describes the site for AI tools", async () => {
    const result = robots();

    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toContain("/sitemap.xml");
    expect(sitemap().length).toBe(6);

    const llmsResponse = await getLlms();
    expect(llmsResponse.headers.get("content-type")).toContain("text/plain");
    expect(await llmsResponse.text()).toContain("# VAURAL");
  });

  it("renders business structured data and a custom 404 heading", () => {
    const structuredDataView = render(<StructuredData />);
    const script = structuredDataView.container.querySelector("#vaural-structured-data");
    const structuredData = JSON.parse(script?.textContent ?? "{}");

    expect(structuredData["@type"]).toBe("ProfessionalService");
    expect(structuredData.hasOfferCatalog.itemListElement).toHaveLength(5);

    const notFoundView = render(<NotFound />);
    expect(notFoundView.getByRole("heading", { level: 1 }).textContent).toContain("página no está disponible");
  });
});
