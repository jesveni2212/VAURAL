import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { getServices } from "@/data/services";
import { SelectionProvider } from "@/components/providers/SelectionProvider";
import { PlansIndex } from "./PlansIndex";

function renderPlans() {
  return render(
    <SelectionProvider>
      <PlansIndex services={getServices()} />
    </SelectionProvider>,
  );
}

describe("PlansIndex", () => {
  afterEach(cleanup);

  it("selects a plan and summarises the selection", () => {
    renderPlans();

    fireEvent.click(screen.getByRole("button", { name: "Seleccionar Páginas web" }));

    expect(screen.getByRole("button", { name: "Quitar Páginas web" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("Elegiste 1 servicio.")).toBeTruthy();
  });

  it("treats keyboard focus like hover: highlights the row, counts it and tints the page", () => {
    renderPlans();
    const title = screen.getByRole("link", { name: "Páginas web" });

    fireEvent.focus(title);

    expect(title.closest("li")?.dataset.active).toBe("true");
    expect(screen.getByTestId("plans-counter").textContent).toBe("02");
    expect(document.documentElement.style.getPropertyValue("--accent")).toBe("#C8F542");
  });

  it("dims only the large titles of the other plans so small text and buttons keep AA contrast", () => {
    renderPlans();

    fireEvent.focus(screen.getByRole("link", { name: "Páginas web" }));

    const otherTitle = screen.getByRole("link", { name: "Asesoría digital" });
    expect(otherTitle.className).toContain("opacity-45");
    expect(otherTitle.closest("li")?.className).not.toMatch(/\bopacity-\d/);
  });

  it("keeps a real link to each plan page", () => {
    renderPlans();

    expect(screen.getByRole("link", { name: "Marketing digital" }).getAttribute("href")).toBe("/servicios/marketing-digital");
  });

  it("opens the plan detail, moves to the next plan and returns focus on close", () => {
    renderPlans();
    const title = screen.getByRole("link", { name: "Páginas web" });

    fireEvent.click(title);
    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog.hasAttribute("open")).toBe(true);
    expect(within(dialog).getByRole("heading", { name: "Páginas web", hidden: true })).toBeTruthy();
    expect(within(dialog).getByText("Incluye")).toBeTruthy();

    fireEvent.click(within(dialog).getByRole("button", { name: /siguiente plan/i, hidden: true }));
    expect(within(dialog).getByRole("heading", { name: "Contenido para redes", hidden: true })).toBeTruthy();

    fireEvent.click(within(dialog).getByRole("button", { name: "Cerrar", hidden: true }));
    expect(dialog.hasAttribute("open")).toBe(false);
    expect(document.activeElement).toBe(screen.getByRole("link", { name: "Contenido para redes" }));
  });
});
