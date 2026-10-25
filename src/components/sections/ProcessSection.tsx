const steps = [
  ["PASO 01", "Conocemos", "Entendemos tu negocio y qué necesitás crear."],
  ["PASO 02", "Definimos", "Definimos el servicio, el estilo y el alcance."],
  ["PASO 03", "Construimos", "Diseñamos y desarrollamos las piezas acordadas."],
  ["PASO 04", "Mejoramos", "Entregamos el material listo para utilizar."],
] as const;

export function ProcessSection() {
  return (
    <section className="section section-tight" id="proceso" aria-labelledby="process-title">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Cómo trabajamos</p>
            <h2 className="section-title" id="process-title">Un proceso claro, de principio a fin.</h2>
          </div>
          <p className="section-intro">Cada proyecto empieza por escuchar, continúa con un plan y avanza con comunicación transparente.</p>
        </div>
        <div className="process-grid">
          {steps.map(([number, title, description]) => (
            <article className="process-step" key={number}>
              <span className="process-number">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
