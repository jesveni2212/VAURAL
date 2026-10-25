"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { getServices } from "@/data/services";
import type { Service } from "@/types/service";

type SelectionContextValue = {
  selectedIds: string[];
  selectedServices: Service[];
  toggleService: (id: string) => void;
  removeService: (id: string) => void;
  clearSelection: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const services = useMemo(() => getServices(), []);
  const selectedServices = useMemo(
    () => services.filter((service) => selectedIds.includes(service.id)),
    [selectedIds, services],
  );

  function toggleService(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function removeService(id: string) {
    setSelectedIds((current) => current.filter((item) => item !== id));
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  return (
    <SelectionContext.Provider
      value={{ selectedIds, selectedServices, toggleService, removeService, clearSelection }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);

  if (!context) {
    throw new Error("useSelection debe utilizarse dentro de SelectionProvider.");
  }

  return context;
}
