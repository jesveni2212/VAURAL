"use client";

import Link from "next/link";
import type { Service } from "@/types/service";

type ServiceCardProps = {
  service: Service;
  selected: boolean;
  onToggle: (id: string) => void;
};

const categoryLabels = {
  web: "Web",
  contenido: "Contenido",
  catalogo: "Catálogo",
} as const;

export function ServiceCard({ service, selected, onToggle }: ServiceCardProps) {
  return (
    <article className={`service-card${selected ? " service-card-selected" : ""}`}>
      <div className="service-card-topline">
        <span className="service-number">0{service.order} / {categoryLabels[service.category]}</span>
        {service.featured ? <span className="service-featured">Destacado</span> : null}
      </div>
      <div className="service-icon" aria-hidden="true">
        {service.category === "web" ? "⌘" : service.category === "contenido" ? "▤" : "▦"}
      </div>
      <h3>{service.title}</h3>
      <p>{service.shortDescription}</p>
      <ul className="service-includes">
        {service.includes.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="service-card-actions">
        <Link className="service-detail-link" href={`/servicios/${service.slug}`}>
          Ver detalle <span aria-hidden="true">↗</span>
        </Link>
        <button
          className={`selection-button${selected ? " selection-button-selected" : ""}`}
          type="button"
          aria-pressed={selected}
          aria-label={`${selected ? "Quitar" : "Seleccionar"} ${service.title}`}
          onClick={() => onToggle(service.id)}
        >
          {selected ? "Seleccionado" : "Seleccionar"}
        </button>
      </div>
    </article>
  );
}
