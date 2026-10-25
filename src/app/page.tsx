import { Hero } from "@/components/hero/Hero";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProcessSection } from "@/components/sections/ProcessSection";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <div className="ticker" aria-label="Servicios de VAURAL">
          <div className="wrap ticker-inner">
            <b>VAURAL</b><span>Páginas web</span><span>Contenido para redes</span><span>Catálogos digitales</span><span>Diseño para negocios</span>
          </div>
        </div>

        <section className="section" id="servicios" aria-labelledby="services-title">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Lo que hacemos</p>
                <h2 className="section-title" id="services-title">Todo lo que tu negocio necesita para verse mejor online.</h2>
              </div>
              <p className="section-intro">En VAURAL creamos soluciones concretas para que tu negocio tenga una presencia digital clara, atractiva y útil.</p>
            </div>
            <div className="shell-placeholder">
              <span className="placeholder-number">01 — 05</span>
              <h3>El catálogo de servicios se incorpora en la próxima etapa.</h3>
              <p>La estructura ya está preparada para seleccionar y combinar servicios.</p>
            </div>
          </div>
        </section>

        <section className="section section-tight" id="planes-web" aria-labelledby="plans-title">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Nuestros planes web</p>
                <h2 className="section-title" id="plans-title">Tu idea tiene un lugar en internet.</h2>
              </div>
              <p className="section-intro">Combiná servicios según lo que tu negocio necesita hoy.</p>
            </div>
          </div>
        </section>

        <AboutSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <div className="wrap footer-inner"><a className="footer-brand" href="#inicio">V<span>AURA</span>L</a><span>© {new Date().getFullYear()} VAURAL. Páginas web, contenido y catálogos digitales.</span><a href="#inicio">Volver arriba ↑</a></div>
      </footer>
    </>
  );
}
