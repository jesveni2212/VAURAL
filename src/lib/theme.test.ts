import { afterEach, describe, expect, it, vi } from "vitest";
import { applyTheme, readStoredTheme, THEME_STORAGE_KEY, toggleTheme } from "./theme";

describe("theme", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete document.documentElement.dataset.theme;
    localStorage.clear();
  });

  it("applies the theme to the document and remembers it", () => {
    applyTheme("dark");

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
  });

  it("toggles instantly when the browser has no view transitions", () => {
    expect(toggleTheme()).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(toggleTheme({ x: 10, y: 10 })).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("falls back to light when storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    expect(readStoredTheme()).toBe("light");
    expect(() => applyTheme("dark")).not.toThrow();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
