import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-shell">
        <p className="section-kicker">VAURAL / 404</p>
        <p className="not-found-code">404</p>
        <h1>Esta página no está disponible.</h1>
        <p>El enlace puede haber cambiado, pero todavía podemos ayudarte a mostrar mejor tu negocio.</p>
        <Link className="button button-primary" href="/#inicio">Volver al inicio <span aria-hidden="true">↗</span></Link>
      </div>
    </main>
  );
}
