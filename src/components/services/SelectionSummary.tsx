"use client";

import { useSelection } from "@/components/providers/SelectionProvider";
import { IconClose } from "@/components/ui/icons";

/** Lives inside the inverted plans section: text uses the page background colour. */
export function SelectionSummary() {
  const { selectedServices, removeService, clearSelection } = useSelection();
  const count = selectedServices.length;

  return (
    <aside aria-live="polite" className="mt-12 flex flex-col gap-6 rounded-3xl border border-bg/15 p-6 md:flex-row md:items-center md:justify-between md:p-8">
      {count ? (
        <>
          <div>
            <p className="label-mono opacity-60">Tu consulta</p>
            <h3 className="mt-2 font-serif text-3xl">
              Elegiste {count} servicio{count === 1 ? "" : "s"}.
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedServices.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => removeService(service.id)}
                  aria-label={`Quitar ${service.title} de la consulta`}
                  className="inline-flex items-center gap-2 rounded-full border border-bg/25 px-3 py-1.5 text-sm transition-colors hover:bg-bg hover:text-fg"
                >
                  {service.title}
                  <IconClose className="size-3.5" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={clearSelection} className="text-sm opacity-70 underline-offset-4 hover:underline hover:opacity-100">
              Limpiar selección
            </button>
            <a href="#contacto" className="rounded-full bg-bg px-5 py-3 font-medium text-fg transition-colors hover:bg-accent hover:text-on-accent">
              Continuar con mi consulta
            </a>
          </div>
        </>
      ) : (
        <div>
          <p className="label-mono opacity-60">Tu consulta</p>
          <p className="mt-2 text-lg opacity-80">Tocá «Elegir este plan» en los que te interesen y preparamos tu consulta personalizada.</p>
        </div>
      )}
    </aside>
  );
}
