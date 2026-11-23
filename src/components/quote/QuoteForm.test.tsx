import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import type { Service } from "@/types/service";
import { QuoteForm } from "./QuoteForm";

const selectedServices: Service[] = [
  {
    id: "web",
    slug: "paginas-web",
    title: "Páginas web",
    shortDescription: "Una web clara.",
    description: "Una web clara.",
    disciplines: ["Webs"],
    includes: [],
    deliverables: [],
    order: 2,
  },
];

describe("QuoteForm", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
  });

  it("requires name, services, and objective", () => {
    render(<QuoteForm selectedServices={[]} />);

    fireEvent.click(screen.getByRole("button", { name: /continuar por whatsapp/i }));

    // Themed error colour (AA on both the light and the inverted theme).
    expect(screen.getByText("Ingresá tu nombre.").className).toContain("text-danger");
    expect(screen.getByText("Seleccioná al menos un servicio.")).toBeTruthy();
    expect(screen.getByText("Contanos brevemente qué necesitás lograr.")).toBeTruthy();
  });

  it("opens a personalized WhatsApp URL with valid data", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "595992396700");
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<QuoteForm selectedServices={selectedServices} />);

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByPlaceholderText("¿Qué te gustaría lograr?"), { target: { value: "Necesito una web." } });
    fireEvent.click(screen.getByRole("button", { name: /continuar por whatsapp/i }));

    expect(open).toHaveBeenCalledWith(expect.stringContaining("wa.me/595992396700"), "_blank", "noopener,noreferrer");
    // With "noopener" window.open always returns null, so null must not be read as "blocked".
    expect(screen.getByRole("status").textContent).not.toContain("bloqueó");
    open.mockRestore();
  });

  it("uses the site's default WhatsApp number when the env variable is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "");
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<QuoteForm selectedServices={selectedServices} />);

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByPlaceholderText("¿Qué te gustaría lograr?"), { target: { value: "Necesito una web." } });
    fireEvent.click(screen.getByRole("button", { name: /continuar por whatsapp/i }));

    expect(open).toHaveBeenCalledWith(expect.stringContaining("wa.me/595992396700"), "_blank", "noopener,noreferrer");
    open.mockRestore();
  });
});
