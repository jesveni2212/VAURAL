export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <div className="hero-scene" />
      </div>
      <div className="hero-grid-layer" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true">
        <div className="hero-ring" />
        <div className="hero-ring hero-ring-inner" />
        <div className="hero-orbit-word">
          V<span>AURA</span>L
        </div>
      </div>

      <div className="wrap hero-frame">
        <div className="hero-meta hero-meta-left">
          <span>ESTUDIO DIGITAL</span>
          <span>DISEÑO · WEB · CONTENIDO</span>
        </div>

        <div className="hero-center">
          <p className="eyebrow">Páginas web · Contenido para redes</p>
          <h1 id="hero-title" className="hero-title">
            VAURAL<span className="title-dot">.</span>
          </h1>
          <p className="hero-tagline">Tu negocio, en su mejor versión digital.</p>
          <p className="hero-copy">
            Creamos páginas web, contenido para redes sociales y catálogos digitales para que tu negocio se presente mejor.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#servicios">
              Explorar servicios <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="#contacto">
              Hablemos de tu proyecto
            </a>
          </div>
        </div>

        <div className="hero-meta hero-meta-right">
          <span>ASUNCIÓN<br />PARAGUAY</span>
          <span>01 — 04<br />VAURAL</span>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>Deslizá</span>
        <i />
      </div>
    </section>
  );
}
