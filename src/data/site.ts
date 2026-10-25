export const siteConfig = {
  name: "VAURAL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaural.vercel.app",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "595992396700",
  description: "Páginas web, contenido para redes sociales y catálogos digitales para negocios.",
  tagline: "Tu negocio, en su mejor versión digital.",
  navigation: [
    { label: "Servicios", href: "#servicios" },
    { label: "Planes web", href: "#planes-web" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Proceso", href: "#proceso" },
  ],
} as const;
