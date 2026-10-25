import { siteConfig } from "@/data/site";

export function GET() {
  const content = [
    "# VAURAL",
    "",
    "> VAURAL crea páginas web, contenido para redes sociales y catálogos digitales para negocios.",
    "",
    "## Sitio",
    "",
    `- Inicio: ${siteConfig.url}/`,
    `- Servicios: ${siteConfig.url}/#planes-web`,
    `- Proceso: ${siteConfig.url}/#proceso`,
    `- Contacto: ${siteConfig.url}/#contacto`,
    "",
    "## Servicios",
    "",
    "VAURAL ofrece soluciones combinables de diseño web, catálogos digitales, pedidos por WhatsApp y contenido para redes. No publica precios: cada consulta se orienta y cotiza según el alcance del proyecto.",
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
