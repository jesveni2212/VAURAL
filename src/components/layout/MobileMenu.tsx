"use client";

import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { siteConfig } from "@/data/site";
import { EASE_EXPO } from "@/lib/motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <m.nav
          id="menu-movil"
          aria-label="Menú móvil"
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.4, ease: EASE_EXPO }}
          className="mx-auto mt-2 max-w-5xl rounded-3xl border border-line bg-bg p-6 md:hidden"
        >
          {siteConfig.navigation.map((item, index) => (
            <m.a
              key={item.href}
              href={item.href}
              onClick={onClose}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * index, duration: 0.5, ease: EASE_EXPO }}
              className="block border-b border-line py-3 font-serif text-4xl last:border-0"
            >
              {item.label}
            </m.a>
          ))}
        </m.nav>
      ) : null}
    </AnimatePresence>
  );
}
