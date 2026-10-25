"use client";

import { useSelection } from "@/components/providers/SelectionProvider";
import { QuoteForm } from "./QuoteForm";

export function QuoteSection() {
  const { selectedServices } = useSelection();

  return <QuoteForm selectedServices={selectedServices} />;
}
