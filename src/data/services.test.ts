import { describe, expect, it } from "vitest";
import { getServiceBySlug, getServices } from "./services";

describe("service pillars", () => {
  it("returns the four pillars in presentation order", () => {
    expect(getServices().map((service) => service.slug)).toEqual([
      "asesoria-digital",
      "paginas-web",
      "contenido-para-redes",
      "marketing-digital",
    ]);
  });

  it("resolves a pillar by slug", () => {
    expect(getServiceBySlug("paginas-web")?.id).toBe("web");
    expect(getServiceBySlug("no-existe")).toBeUndefined();
  });

  it("describes every pillar completely", () => {
    for (const service of getServices()) {
      expect(service.disciplines.length).toBeGreaterThan(0);
      expect(service.includes.length).toBeGreaterThan(0);
      expect(service.deliverables.length).toBeGreaterThan(0);
    }
  });

  it("does not expose public prices", () => {
    const content = JSON.stringify(getServices()).toLowerCase();

    expect(content).not.toContain("precio");
    expect(content).not.toContain("$");
  });
});
