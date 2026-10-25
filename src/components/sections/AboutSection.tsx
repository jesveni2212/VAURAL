export function AboutSection() {
  return (
    <section className="section" id="nosotros" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div>
          <p className="section-kicker">Quiénes somos</p>
          <h2 className="section-title" id="about-title">
            Diseño digital pensado para negocios reales.
          </h2>
          <div className="about-panel">
            <div className="about-mark">
              V<span>AURA</span>L
            </div>
            <p>Combinamos diseño web, contenido visual y organización de catálogos para que cada negocio pueda mostrar mejor lo que hace.</p>
          </div>
        </div>
        <div className="about-copy">
          <p>VAURAL reúne desarrollo web y creación de contenido digital en una propuesta práctica para negocios que quieren mejorar cómo se presentan online.</p>
          <p>Trabajamos con emprendedores, profesionales, comercios y empresas que necesitan una presencia digital clara, atractiva y útil.</p>
          <div className="values">
            <div className="value"><b>Diseño funcional</b><span>Claro, atractivo y útil.</span></div>
            <div className="value"><b>Adaptado a tu marca</b><span>Una imagen coherente y profesional.</span></div>
            <div className="value"><b>Comunicación cercana</b><span>Trabajamos en conjunto.</span></div>
            <div className="value"><b>Soluciones prácticas</b><span>Servicios según tu necesidad.</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
