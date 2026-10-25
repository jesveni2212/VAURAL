import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import type { Service } from "@/types/service";
import { QuoteForm } from "./QuoteForm";

const selectedServices: Service[] = [
  {
    id: "web-informativa",
    slug: "web-informativa",
    title: "Web informativa",
    category: "web",
    shortDescription: "Una web clara.",
    description: "Una web clara.",
    includes: [],
    deliverables: [],
    order: 1,
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

    expect(screen.getByText("Ingresá tu nombre.")).toBeTruthy();
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
    expect(screen.getByRole("status")).toBeTruthy();
    open.mockRestore();
  });
});
