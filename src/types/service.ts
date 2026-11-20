export type PillarId = "asesoria" | "web" | "contenido" | "marketing";

export type Service = {
  id: PillarId;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  disciplines: string[];
  includes: string[];
  deliverables: string[];
  order: number;
};
