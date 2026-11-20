"use client";

import type { MouseEvent } from "react";
import { toggleTheme } from "@/lib/theme";
import { IconContrast } from "@/components/ui/icons";

/** Inverts the page; the reveal grows from the click point (or the button centre for keyboard users). */
export function ThemeToggle() {
  function invert(event: MouseEvent<HTMLButtonElement>) {
    const fromKeyboard = event.detail === 0;
    const box = event.currentTarget.getBoundingClientRect();

    toggleTheme(
      fromKeyboard
        ? { x: box.left + box.width / 2, y: box.top + box.height / 2 }
        : { x: event.clientX, y: event.clientY },
    );
  }

  return (
    <button
      type="button"
      onClick={invert}
      aria-label="Invertir colores"
      title="Invertir colores"
      className="grid size-9 place-items-center rounded-full border border-line transition-colors duration-300 hover:bg-fg hover:text-bg"
    >
      <IconContrast />
    </button>
  );
}
