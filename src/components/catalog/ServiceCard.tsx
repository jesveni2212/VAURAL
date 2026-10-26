"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
  const motionDelay = Math.max(service.order - 1, 0) * 0.08;

  return (
    <motion.article
      className={`service-card${selected ? " service-card-selected" : ""}`}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay: motionDelay, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.22, ease: "easeOut" } }}
    >
      <motion.span
        className="service-card-sheen"
        aria-hidden="true"
        animate={{ x: ["-130%", "260%"] }}
        transition={{ duration: 5.5, delay: motionDelay, repeat: Infinity, ease: "linear" }}
      />
      <div className="service-card-topline">
        <span className="service-number">0{service.order} / {categoryLabels[service.category]}</span>
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
          Ver detalle
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
    </motion.article>
  );
}
