import type { PillarId } from "@/types/service";

/** Presentation-only colour per pillar. Text on top of these is always #0A0A0A. */
export const pillarAccent: Record<PillarId, string> = {
  asesoria: "#4D6BFF",
  web: "#C8F542",
  contenido: "#FF5FA2",
  marketing: "#FF8A2A",
};

/** One-word label for compact UI (journey steps, band). */
export const pillarShortLabel: Record<PillarId, string> = {
  asesoria: "Asesoría",
  web: "Web",
  contenido: "Contenido",
  marketing: "Marketing",
};
