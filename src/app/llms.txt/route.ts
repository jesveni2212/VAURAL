import { getServices } from "@/data/services";
import { siteConfig } from "@/data/site";

export function GET() {
  const content = [
    "# VAURAL",
    "",
    `> ${siteConfig.description}`,
    "",
    "## Sitio",
    "",
    `- Inicio: ${siteConfig.url}/`,
    `- Recorrido de servicios: ${siteConfig.url}/#recorrido`,
    `- Planes: ${siteConfig.url}/#planes`,
    `- Contacto: ${siteConfig.url}/#contacto`,
    "",
    "## Servicios",
    "",
    ...getServices().map((service) => `- ${service.title}: ${service.shortDescription} (${siteConfig.url}/servicios/${service.slug})`),
    "",
    "Los planes se combinan entre sí. VAURAL no publica precios: cada consulta se orienta y cotiza por WhatsApp según el alcance del proyecto.",
    "",
    "## Contacto",
    "",
    `WhatsApp: +${siteConfig.whatsappNumber}`,
    "Mensaje sugerido: Hola, quiero consultar por los servicios de VAURAL",
    "",
    "## Referencia de portfolio",
    "",
    "- Proyecto destacado: https://jesusvenialgo.com",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
