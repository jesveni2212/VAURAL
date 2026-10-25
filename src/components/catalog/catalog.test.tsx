import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SelectionProvider } from "@/components/providers/SelectionProvider";
import { ServiceGrid } from "./ServiceGrid";
import { SelectionSummary } from "./SelectionSummary";

function CatalogFixture() {
  return (
    <SelectionProvider>
      <ServiceGrid />
      <SelectionSummary />
    </SelectionProvider>
  );
}

describe("service catalog", () => {
  it("allows combining services and removing one from the summary", () => {
    render(<CatalogFixture />);

    fireEvent.click(screen.getByRole("button", { name: "Seleccionar Web informativa" }));
    fireEvent.click(screen.getByRole("button", { name: "Seleccionar Catálogo digital" }));

    expect(screen.getByText("Elegiste 2 servicios.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Web informativa" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Catálogo digital" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Web informativa" }));
    expect(screen.getByText("Elegiste 1 servicio.")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Web informativa" })).toBeNull();
  });

  it("explains how to begin when there is no selection", () => {
    render(<CatalogFixture />);

    expect(screen.getByText("Seleccioná uno o varios servicios para preparar una consulta personalizada.")).toBeTruthy();
  });

  it("highlights the first and third services", () => {
    const view = render(<CatalogFixture />);

    const cards = view.container.querySelectorAll(".service-card");

    expect(cards[0].classList.contains("service-card-highlighted")).toBe(true);
    expect(cards[2].classList.contains("service-card-highlighted")).toBe(true);
    expect(view.container.querySelectorAll(".service-featured")).toHaveLength(2);
  });
});
