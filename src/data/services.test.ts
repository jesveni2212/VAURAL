import { describe, expect, it } from "vitest";
import { getServiceBySlug, getServices } from "./services";

describe("service catalog", () => {
  it("returns services in presentation order", () => {
    const services = getServices();

    expect(services.length).toBeGreaterThan(0);
    expect(services.map((service) => service.order)).toEqual(
      [...services].map((service) => service.order).sort((a, b) => a - b),
    );
  });

  it("resolves a service by slug", () => {
    expect(getServiceBySlug("web-informativa")?.title).toBe("Web informativa");
    expect(getServiceBySlug("no-existe")).toBeUndefined();
  });

  it("does not expose public prices", () => {
    expect(JSON.stringify(getServices()).toLowerCase()).not.toContain("precio");
    expect(JSON.stringify(getServices()).toLowerCase()).not.toContain("$0");
  });
});
