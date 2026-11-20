/**
 * Page-wide accent colour. Written straight to the root CSS variable so changing it
 * never re-renders React; the registered `--accent` property animates the change.
 * A "preview" (e.g. hovering a plan) temporarily wins over the "base" (the active journey step).
 */
let baseAccent = "";
let previewColor: string | null = null;

function writeAccent(color: string): void {
  document.documentElement.style.setProperty("--accent", color);
}

export function setBaseAccent(color: string): void {
  baseAccent = color;
  if (previewColor === null) writeAccent(color);
}

export function previewAccent(color: string): void {
  previewColor = color;
  writeAccent(color);
}

export function clearAccentPreview(): void {
  previewColor = null;
  if (baseAccent) writeAccent(baseAccent);
}
