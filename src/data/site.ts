export const siteConfig = {
  name: "VAURAL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vaural.vercel.app",
  // `||` so an empty variable also falls back to the public number.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595992396700",
  description:
    "VAURAL es una agencia digital para negocios en Paraguay: asesoría, páginas web, contenido para redes y marketing digital. Consultá por WhatsApp y armá tu propuesta a medida.",
  navigation: [
    { label: "Servicios", href: "#recorrido" },
    { label: "Planes", href: "#planes" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const;
