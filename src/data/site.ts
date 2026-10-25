export const siteConfig = {
  name: "VAURAL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaural.vercel.app",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "595992396700",
  description: "VAURAL crea páginas web, contenido para redes y catálogos digitales para negocios en Paraguay. Consultá por WhatsApp y armá tu propuesta a medida.",
  tagline: "Tu negocio, en su mejor versión digital.",
  navigation: [
    { label: "Servicios", href: "#servicios" },
    { label: "Planes web", href: "#planes-web" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Proceso", href: "#proceso" },
  ],
} as const;
