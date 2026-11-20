export type Theme = "light" | "dark";

type Point = { x: number; y: number };

export const THEME_STORAGE_KEY = "vaural-theme";

/** Runs before first paint (inline in <head>) so the stored theme never flashes. */
export const THEME_INIT_SCRIPT = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

const REVEAL_DURATION_MS = 700;
const REVEAL_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

export function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode): the theme still applies for this visit.
  }
}

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function revealFrom({ x, y }: Point): void {
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  document.documentElement.animate(
    { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
    { duration: REVEAL_DURATION_MS, easing: REVEAL_EASING, pseudoElement: "::view-transition-new(root)" },
  );
}

/** Switches theme; with View Transitions support it reveals the new theme in a circle from `origin`. */
export function toggleTheme(origin?: Point): Theme {
  const next: Theme = currentTheme() === "dark" ? "light" : "dark";
  const change = () => applyTheme(next);

  if (typeof document.startViewTransition !== "function" || prefersReducedMotion()) {
    change();
    return next;
  }

  const transition = document.startViewTransition(change);
  if (origin) transition.ready.then(() => revealFrom(origin)).catch(() => undefined);

  return next;
}
