"use client";

import { getServices } from "@/data/services";
import { useSelection } from "@/components/providers/SelectionProvider";
import { ServiceCard } from "./ServiceCard";

export function ServiceGrid() {
  const services = getServices();
  const { selectedIds, toggleService } = useSelection();

  return (
    <div className="services-grid">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          selected={selectedIds.includes(service.id)}
          onToggle={toggleService}
        />
      ))}
    </div>
  );
}
