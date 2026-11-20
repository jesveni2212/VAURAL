import type { Service } from "@/types/service";

const services: Service[] = [
  {
    id: "asesoria",
    slug: "asesoria-digital",
    title: "Asesoría digital",
    shortDescription: "Entendemos tu negocio y armamos un plan claro para crecer online.",
    description:
      "Analizamos cómo se presenta hoy tu negocio en internet, definimos objetivos realistas y te entregamos un plan de acción con prioridades, canales y próximos pasos.",
    disciplines: ["Estrategia", "Plan de acción"],
    includes: [
      "Diagnóstico de tu presencia digital",
      "Definición de objetivos y público",
      "Elección de canales y formatos",
      "Prioridades y próximos pasos",
      "Sesión de acompañamiento",
    ],
    deliverables: ["Diagnóstico escrito", "Plan de acción", "Calendario de prioridades"],
    order: 1,
  },
  {
    id: "web",
    slug: "paginas-web",
    title: "Páginas web",
    shortDescription: "Creamos la web donde tus clientes te encuentran, te conocen y te escriben.",
    description:
      "Webs informativas, interactivas, catálogos y tiendas con pedidos por WhatsApp. Diseño adaptable, rápido y pensado para que cada visita termine en una consulta.",
    disciplines: ["Webs", "Tiendas", "Catálogos"],
    includes: [
      "Diseño adaptable a celulares y computadoras",
      "Secciones de servicios, galerías y formularios",
      "Catálogo o tienda con pedidos por WhatsApp",
      "Configuración SEO básica",
      "Publicación y dominio",
    ],
    deliverables: ["Sitio publicado", "Estructura de contenido", "Guía de actualización"],
    order: 2,
  },
  {
    id: "contenido",
    slug: "contenido-para-redes",
    title: "Contenido para redes",
    shortDescription: "Diseñamos piezas que hacen que tu marca se reconozca en cada publicación.",
    description:
      "Dirección visual y piezas para publicaciones, stories y portadas, adaptadas a cada red y organizadas para mantener una imagen coherente en el tiempo.",
    disciplines: ["Diseño", "Posts", "Stories"],
    includes: [
      "Dirección visual para la marca",
      "Piezas para publicaciones y stories",
      "Adaptación a los formatos de cada red",
      "Organización de temas y mensajes",
      "Plantillas reutilizables",
    ],
    deliverables: ["Sistema visual de piezas", "Contenido listo para publicar", "Guía de uso básica"],
    order: 3,
  },
  {
    id: "marketing",
    slug: "marketing-digital",
    title: "Marketing digital",
    shortDescription: "Llevamos tu mensaje a más personas y medimos qué funciona.",
    description:
      "Planificamos y gestionamos campañas en redes y buscadores, definimos el público adecuado y revisamos los resultados para mejorar cada mes.",
    disciplines: ["Campañas", "Métricas"],
    includes: [
      "Estrategia de campañas",
      "Segmentación de público",
      "Anuncios en redes sociales",
      "Seguimiento de consultas y alcance",
      "Informe de resultados",
    ],
    deliverables: ["Campañas configuradas", "Informe mensual", "Recomendaciones de mejora"],
    order: 4,
  },
];

export function getServices(): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
