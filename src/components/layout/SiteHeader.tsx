"use client";

import { useCallback, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import { siteConfig } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";
import { headerState } from "./header-visibility";
import { VauralLogo } from "@/components/brand/VauralLogo";
import { Magnetic } from "@/components/motion/Magnetic";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const [scroll, setScroll] = useState({ y: 0, previousY: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScroll({ y, previousY: lastY.current });
    lastY.current = y;
  });

  const { compact, hidden } = headerState(scroll.y, scroll.previousY, menuOpen || focusInside);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <m.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
      // Off-screen controls must not be reachable with Tab.
      inert={hidden}
      onFocus={() => setFocusInside(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusInside(false);
      }}
    >
      <div
        className={`mx-auto flex items-center justify-between gap-4 rounded-full border transition-all duration-500 ease-expo ${
          compact ? "max-w-5xl border-line bg-bg/80 py-2 pr-2 pl-5 backdrop-blur-md" : "max-w-7xl border-transparent py-3 pr-1 pl-2"
        }`}
      >
        <a href="#recorrido" aria-label="VAURAL, ir al inicio" className="flex items-center gap-2.5" onClick={closeMenu}>
          <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
          <VauralLogo className="h-6 w-auto sm:h-7" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} className="group label-mono relative text-muted transition-colors hover:text-fg">
              {item.label}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-expo group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Magnetic className="hidden sm:inline-block">
            <a href="#contacto" className="inline-block rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent hover:text-on-accent">
              Hablemos
            </a>
          </Magnetic>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm md:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
            <span>{menuOpen ? "Cerrar" : "Menú"}</span>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </m.header>
  );
}
