import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "./whatsapp";

const input = {
  phoneNumber: "+595 992 396 700",
  name: "Ana",
  business: "Estudio Norte",
  email: "ana@example.com",
  objective: "Necesito presentar mis servicios.",
  services: ["Web informativa", "Catálogo digital"],
};

describe("WhatsApp utilities", () => {
  it("includes the selected services and form data", () => {
    const message = buildWhatsAppMessage(input);

    expect(message).toContain("Ana");
    expect(message).toContain("Estudio Norte");
    expect(message).toContain("Web informativa");
    expect(message).toContain("Catálogo digital");
    expect(message).toContain("Necesito presentar mis servicios.");
    expect(message).not.toContain("$0");
  });

  it("returns an encoded WhatsApp URL", () => {
    const url = buildWhatsAppUrl(input);

    expect(url.startsWith("https://wa.me/595992396700?text=")).toBe(true);
    expect(url).toContain(encodeURIComponent("Web informativa"));
  });

  it("rejects a missing phone number", () => {
    expect(() => buildWhatsAppUrl({ ...input, phoneNumber: "---" })).toThrow(
      "Se necesita un número de WhatsApp válido.",
    );
  });
});
