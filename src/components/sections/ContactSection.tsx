export function ContactSection() {
  return (
    <section className="contact-section" id="contacto" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div>
          <p className="section-kicker">Hablemos</p>
          <h2 className="contact-title" id="contact-title">Mostremos lo mejor de tu negocio.</h2>
          <p className="contact-copy">Elegí los servicios que te interesan y contanos qué te gustaría lograr. Te orientamos por WhatsApp.</p>
          <div className="contact-meta">
            <div>↗ Páginas web para negocios</div>
            <div>↗ Contenido para redes sociales</div>
            <div>↗ Catálogos digitales</div>
          </div>
        </div>
        <div className="contact-placeholder">
          <span className="section-kicker">Próximo paso</span>
          <h3>Seleccioná un servicio para empezar tu consulta.</h3>
          <p>El formulario breve y el mensaje personalizado de WhatsApp se incorporan en la siguiente etapa.</p>
        </div>
      </div>
    </section>
  );
}
