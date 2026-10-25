import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage, buildWhatsAppQuickUrl, buildWhatsAppUrl } from "./whatsapp";

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

  it("builds a quick consultation URL for the floating CTA", () => {
    const url = buildWhatsAppQuickUrl(
      "+595 992 396 700",
      "Hola, quiero consultar por los servicios de VAURAL",
    );

    expect(url).toBe(
      `https://wa.me/595992396700?text=${encodeURIComponent("Hola, quiero consultar por los servicios de VAURAL")}`,
    );
  });

  it("rejects a missing phone number", () => {
    expect(() => buildWhatsAppUrl({ ...input, phoneNumber: "---" })).toThrow(
      "Se necesita un número de WhatsApp válido.",
    );
  });
});
