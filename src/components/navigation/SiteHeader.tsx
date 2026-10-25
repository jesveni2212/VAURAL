"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="topline" />
      <div className="wrap nav">
        <a className="brand" href="#inicio" aria-label="VAURAL inicio" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">V/L</span>
          <span>
            V<span className="brand-accent">AURA</span>L
          </span>
        </a>

        <nav className="nav-links" aria-label="Navegación principal">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#contacto">
            Hablemos <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          className="mobile-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Cerrar" : "Menú"}</span>
          <span className="mobile-toggle-icon" aria-hidden="true">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {menuOpen ? (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Navegación móvil">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setMenuOpen(false)}>
            Hablemos de tu proyecto <span aria-hidden="true">↗</span>
          </a>
        </nav>
      ) : null}
    </header>
  );
}
