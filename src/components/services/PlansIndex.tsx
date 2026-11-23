"use client";

import { useRef, useState } from "react";
import type { Service } from "@/types/service";
import { clearAccentPreview, previewAccent } from "@/lib/accent";
import { padNumber } from "@/lib/format";
import { useSelection } from "@/components/providers/SelectionProvider";
import { PlanDialog } from "./PlanDialog";
import { PlanRow } from "./PlanRow";
import { SelectionSummary } from "./SelectionSummary";
import { pillarAccent } from "./pillar-theme";

type PlansIndexProps = {
  services: Service[];
};

export function PlansIndex({ services }: PlansIndexProps) {
  const { selectedIds, toggleService } = useSelection();
  const [hovered, setHovered] = useState<number | null>(null);
  const [dialogIndex, setDialogIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const titleRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);
  const skipFocusReturn = useRef(false);
  const dialogService = dialogIndex === null ? null : services[dialogIndex];

  // Hovering (or focusing) a plan tints the whole page with that pillar's colour.
  function activate(index: number) {
    setHovered(index);
    previewAccent(pillarAccent[services[index].id]);
  }

  function deactivate() {
    setHovered(null);
    clearAccentPreview();
  }

  function openPlan(index: number) {
    setDialogIndex(index);
    setDialogOpen(true);
  }

  function closePlan() {
    setDialogOpen(false);
    // After choosing a plan the visitor goes to the summary; returning focus to the title would scroll back up.
    if (skipFocusReturn.current) skipFocusReturn.current = false;
    else if (dialogIndex !== null) titleRefs.current[dialogIndex]?.focus();
  }

  /** Choosing a plan (not removing one) takes the visitor to the summary with its "continue" action. */
  function chooseService(service: Service, fromDialog = false) {
    const wasSelected = selectedIds.includes(service.id);
    toggleService(service.id);
    if (wasSelected) return;

    if (fromDialog) {
      skipFocusReturn.current = true;
      setDialogOpen(false);
    }
    // Wait a tick: the summary grows once the choice renders and the dialog restores focus on close.
    setTimeout(() => {
      summaryRef.current?.scrollIntoView?.({ block: "center" });
      summaryRef.current?.focus({ preventScroll: true });
    }, 60);
  }

  return (
    <section id="planes" aria-labelledby="plans-title" className="bg-fg text-bg">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="reveal grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="label-mono opacity-60">Planes</p>
            <h2 id="plans-title" className="mt-4 font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95]">
              Elegí por dónde <em className="italic">empezar.</em>
            </h2>
          </div>
          <p className="max-w-sm opacity-70">Tocá el nombre de un plan para ver qué incluye. Con «Elegir este plan» juntás los que te interesen y te armamos una propuesta por WhatsApp.</p>
        </div>

        <div className="label-mono mt-14 flex flex-wrap justify-between gap-3 border-b border-bg/15 pb-4 opacity-80">
          <span>
            <span data-testid="plans-counter" className="text-bg">{padNumber((hovered ?? 0) + 1)}</span> / {padNumber(services.length)}
          </span>
          <span className="hidden sm:inline">Planes a medida · sin precios publicados</span>
          <span>Elegidos: {selectedIds.length}</span>
        </div>

        <ul onPointerLeave={deactivate}>
          {services.map((service, index) => (
            <PlanRow
              key={service.id}
              service={service}
              index={index}
              active={hovered === index}
              dimmed={hovered !== null && hovered !== index}
              selected={selectedIds.includes(service.id)}
              titleRef={(element) => {
                titleRefs.current[index] = element;
              }}
              onActivate={() => activate(index)}
              onDeactivate={deactivate}
              onOpen={() => openPlan(index)}
              onToggle={() => chooseService(service)}
            />
          ))}
        </ul>

        <div ref={summaryRef} tabIndex={-1} className="outline-none">
          <SelectionSummary />
        </div>
      </div>

      <PlanDialog
        service={dialogService}
        position={(dialogIndex ?? 0) + 1}
        open={dialogOpen}
        selected={dialogService ? selectedIds.includes(dialogService.id) : false}
        onToggle={() => dialogService && chooseService(dialogService, true)}
        onNext={() => setDialogIndex(((dialogIndex ?? 0) + 1) % services.length)}
        onClose={closePlan}
      />
    </section>
  );
}
