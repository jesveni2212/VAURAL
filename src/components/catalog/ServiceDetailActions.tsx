"use client";

import Link from "next/link";
import { useSelection } from "@/components/providers/SelectionProvider";

type ServiceDetailActionsProps = {
  serviceId: string;
};

export function ServiceDetailActions({ serviceId }: ServiceDetailActionsProps) {
  const { selectedIds, toggleService } = useSelection();
  const selected = selectedIds.includes(serviceId);

  return (
    <div className="detail-actions">
      <button className="button button-primary" type="button" onClick={() => toggleService(serviceId)} aria-pressed={selected}>
        {selected ? "Servicio seleccionado" : "Sumar a mi consulta"} <span aria-hidden="true">↗</span>
      </button>
      <Link className="button button-ghost" href="/#servicios">Ver todos los servicios</Link>
    </div>
  );
}
