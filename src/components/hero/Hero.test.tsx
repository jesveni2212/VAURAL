import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("communicates the VAURAL proposition and primary actions", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { name: "VAURAL." })).toBeTruthy();
    expect(screen.getByText("Tu negocio, en su mejor versión digital.")).toBeTruthy();
    expect(screen.getByRole("link", { name: /explorar servicios/i }).getAttribute("href")).toBe("#servicios");
    expect(screen.getByRole("link", { name: /hablemos de tu proyecto/i }).getAttribute("href")).toBe("#contacto");
  });
});
