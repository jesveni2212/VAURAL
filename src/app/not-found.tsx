import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-5 py-24">
      <p className="label-mono text-muted">VAURAL / 404</p>
      <p className="mt-4 font-serif text-[clamp(6rem,20vw,12rem)] leading-none">
        4<span className="marker">0</span>4
      </p>
      <h1 className="mt-6 font-serif text-4xl">Esta página no está disponible.</h1>
      <p className="mt-4 max-w-md text-muted">El enlace puede haber cambiado, pero todavía podemos ayudarte a llevar tu idea hasta el cliente.</p>
      <Link href="/" className="mt-8 self-start rounded-full bg-fg px-6 py-3.5 font-medium text-bg transition-colors hover:bg-accent hover:text-on-accent">
        Volver al inicio
      </Link>
    </main>
  );
}
