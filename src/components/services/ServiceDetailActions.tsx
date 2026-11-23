"use client";

import Link from "next/link";
import { useSelection } from "@/components/providers/SelectionProvider";
import type { PillarId } from "@/types/service";

export function ServiceDetailActions({ serviceId }: { serviceId: PillarId }) {
  const { selectedIds, toggleService } = useSelection();
  const selected = selectedIds.includes(serviceId);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => toggleService(serviceId)}
        aria-pressed={selected}
        className={`rounded-full px-6 py-3.5 font-medium transition-colors ${selected ? "bg-accent text-on-accent" : "bg-fg text-bg hover:bg-accent hover:text-on-accent"}`}
      >
        {selected ? "Elegido, tocá para quitar" : "Elegir este plan"}
      </button>
      <Link href="/#planes" className="rounded-full border border-fg px-6 py-3.5 font-medium transition-colors hover:bg-fg hover:text-bg">
        Ver otros planes
      </Link>
    </div>
  );
}
