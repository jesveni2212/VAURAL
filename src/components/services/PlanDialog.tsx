"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Service } from "@/types/service";
import { padNumber } from "@/lib/format";
import { IconArrow, IconClose } from "@/components/ui/icons";
import { pillarAccent } from "./pillar-theme";

type PlanDialogProps = {
  /** Last plan shown: kept while closing so the exit animation has content. */
  service: Service | null;
  position: number;
  open: boolean;
  selected: boolean;
  onToggle: () => void;
  onNext: () => void;
  onClose: () => void;
};

/** Native modal <dialog>: focus trap, Escape and backdrop come from the browser; the animation from CSS. */
export function PlanDialog({ service, position, open, selected, onToggle, onNext, onClose }: PlanDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // The dialog has no padding, so a click whose target is the <dialog> itself landed on the backdrop.
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      aria-labelledby="plan-dialog-title"
      className="plan-dialog m-auto max-h-[88vh] w-[min(92vw,46rem)] overflow-y-auto rounded-3xl bg-bg p-0 text-fg"
    >
      {service ? (
        <article style={{ "--row-accent": pillarAccent[service.id] } as CSSProperties} className="p-6 md:p-10">
          <header className="flex items-center justify-between gap-4">
            <p className="label-mono flex items-center gap-2 text-muted">
              <span className="size-2 rounded-full bg-(--row-accent)" />
              Plan {padNumber(position)}
            </p>
            <button type="button" aria-label="Cerrar" onClick={() => ref.current?.close()} className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:bg-fg hover:text-bg">
              <IconClose />
            </button>
          </header>

          <h2 id="plan-dialog-title" className="mt-6 font-serif text-5xl leading-none md:text-6xl">
            {service.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">{service.description}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <DetailList title="Incluye" items={service.includes} />
            <DetailList title="Entregables" items={service.deliverables} />
          </div>

          <p className="mt-8 border-t border-line pt-5 text-sm text-muted">Sin precios publicados: te orientamos y cotizamos por WhatsApp según tu proyecto.</p>

          <footer className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onToggle}
              aria-pressed={selected}
              className={`rounded-full px-5 py-3 font-medium transition-colors ${selected ? "bg-(--row-accent) text-on-accent" : "bg-fg text-bg hover:bg-(--row-accent) hover:text-on-accent"}`}
            >
              {selected ? "Elegido, tocá para quitar" : "Elegir este plan"}
            </button>
            <button type="button" onClick={onNext} className="group inline-flex items-center gap-2 rounded-full border border-fg px-5 py-3 font-medium transition-colors hover:bg-fg hover:text-bg">
              Siguiente plan
              <IconArrow className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>
            <a href={`/servicios/${service.slug}`} className="label-mono ml-auto text-muted underline-offset-4 hover:text-fg hover:underline">
              Ver página
            </a>
          </footer>
        </article>
      ) : null}
    </dialog>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="label-mono text-muted">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 bg-(--row-accent)" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
