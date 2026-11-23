import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  afterEach(() => {
    cleanup();
    delete document.documentElement.dataset.theme;
    localStorage.clear();
  });

  it("inverts the page colours from the contrast button", () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: "Invertir colores" }));

    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("opens the mobile navigation and closes it with Escape", () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: /menú/i });

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("navigation", { name: "Menú móvil" })).toBeTruthy();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("hides the Hablemos pill on phones so the bar never overflows", () => {
    render(<SiteHeader />);
    const wrapper = screen.getByRole("link", { name: "Hablemos" }).parentElement;

    expect(wrapper?.classList.contains("hidden")).toBe(true);
    expect(wrapper?.classList.contains("inline-block")).toBe(false);
  });

  it("links every section of the page", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Principal" });

    expect(nav.querySelector('a[href="#planes"]')).toBeTruthy();
    expect(screen.getByRole("link", { name: "Hablemos" }).getAttribute("href")).toBe("#contacto");
  });
});
