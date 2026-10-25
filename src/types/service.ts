export type ServiceCategory = "web" | "contenido" | "catalogo";

export type Service = {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  includes: string[];
  deliverables: string[];
  featured?: boolean;
  order: number;
};
