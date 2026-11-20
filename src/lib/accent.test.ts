import { afterEach, describe, expect, it } from "vitest";
import { clearAccentPreview, previewAccent, setBaseAccent } from "./accent";

const accent = () => document.documentElement.style.getPropertyValue("--accent");

describe("accent", () => {
  afterEach(() => {
    clearAccentPreview();
    document.documentElement.style.removeProperty("--accent");
  });

  it("sets the base accent on the document", () => {
    setBaseAccent("#4D6BFF");

    expect(accent()).toBe("#4D6BFF");
  });

  it("previews a temporary accent and restores the base afterwards", () => {
    setBaseAccent("#4D6BFF");
    previewAccent("#FF5FA2");
    expect(accent()).toBe("#FF5FA2");

    setBaseAccent("#C8F542");
    expect(accent()).toBe("#FF5FA2");

    clearAccentPreview();
    expect(accent()).toBe("#C8F542");
  });
});
