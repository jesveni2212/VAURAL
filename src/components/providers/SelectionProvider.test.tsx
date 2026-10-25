import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SelectionProvider, useSelection } from "./SelectionProvider";

function SelectionConsumer() {
  const { selectedIds, toggleService, clearSelection } = useSelection();

  return (
    <div>
      <output data-testid="selected">{selectedIds.join(",")}</output>
      <button onClick={() => toggleService("web-informativa")}>web</button>
      <button onClick={() => toggleService("catalogo-digital")}>catalogo</button>
      <button onClick={clearSelection}>limpiar</button>
    </div>
  );
}

describe("SelectionProvider", () => {
  it("adds, removes, and clears services", () => {
    render(
      <SelectionProvider>
        <SelectionConsumer />
      </SelectionProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "web" }));
    fireEvent.click(screen.getByRole("button", { name: "catalogo" }));
    expect(screen.getByTestId("selected").textContent).toBe("web-informativa,catalogo-digital");

    fireEvent.click(screen.getByRole("button", { name: "web" }));
    expect(screen.getByTestId("selected").textContent).toBe("catalogo-digital");

    fireEvent.click(screen.getByRole("button", { name: "limpiar" }));
    expect(screen.getByTestId("selected").textContent).toBe("");
  });
});
