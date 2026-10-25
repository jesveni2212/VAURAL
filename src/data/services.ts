import type { Service } from "@/types/service";

const services: Service[] = [
  {
    id: "web-informativa",
    slug: "web-informativa",
    title: "Web informativa",
    category: "web",
    shortDescription: "Una presencia online profesional para presentar tu negocio y facilitar el contacto.",
    description:
      "Una página clara y elegante para explicar qué hacés, mostrar tus servicios y ayudar a que tus clientes sepan cómo contactarte.",
    includes: [
      "Diseño adaptable a celulares y computadoras",
      "Secciones de información y servicios",
      "Botón de contacto por WhatsApp",
      "Redes sociales y formulario de contacto",
      "Configuración SEO básica",
    ],
    deliverables: ["Landing page publicada", "Estructura de contenido", "Configuración responsive"],
    featured: true,
    highlighted: true,
    order: 1,
  },
  {
    id: "web-interactiva",
    slug: "web-interactiva",
    title: "Web interactiva",
    category: "web",
    shortDescription: "Una web pensada para que tus visitantes exploren y realicen acciones.",
    description:
      "Una experiencia más completa para negocios que necesitan formularios, galerías, solicitudes o recorridos interactivos.",
    includes: [
      "Todo lo incluido en la web informativa",
      "Formularios personalizados",
      "Secciones dinámicas y galerías",
      "Solicitudes de presupuesto o reservas",
      "Funciones interactivas según el proyecto",
    ],
    deliverables: ["Experiencia interactiva", "Componentes a medida", "Flujos de contacto"],
    order: 2,
  },
  {
    id: "tienda-pedidos-whatsapp",
    slug: "tienda-pedidos-whatsapp",
    title: "Catálogo con pedidos por WhatsApp",
    category: "catalogo",
    shortDescription: "Mostrá tus productos y recibí consultas o pedidos directamente por WhatsApp.",
    description:
      "Una experiencia de catálogo para organizar productos, mostrar detalles y preparar pedidos que luego se coordinan directamente con tu negocio.",
    includes: [
      "Catálogo con fotos y descripciones",
      "Categorías y fichas de productos",
      "Botones de pedido por WhatsApp",
      "Mensaje de pedido preparado",
      "Información de envíos, entregas o retiros",
    ],
    deliverables: ["Catálogo navegable", "Selección de productos", "Flujo de pedido por WhatsApp"],
    highlighted: true,
    order: 3,
  },
  {
    id: "contenido-redes",
    slug: "contenido-redes",
    title: "Contenido para redes sociales",
    category: "contenido",
    shortDescription: "Piezas visuales para comunicar lo que hacés con una imagen coherente.",
    description:
      "Diseño y organización de contenido visual para que tu marca se vea profesional y consistente en los canales donde tus clientes ya están.",
    includes: [
      "Dirección visual para la marca",
      "Piezas para publicaciones y stories",
      "Adaptación a los formatos de cada red",
      "Organización de temas y mensajes",
      "Criterios para mantener consistencia",
    ],
    deliverables: ["Sistema visual de piezas", "Contenido listo para publicar", "Guía de uso básica"],
    order: 4,
  },
  {
    id: "catalogo-digital",
    slug: "catalogo-digital",
    title: "Catálogo digital",
    category: "catalogo",
    shortDescription: "Productos o servicios organizados para compartir fácilmente con tus clientes.",
    description:
      "Un catálogo visual y fácil de recorrer para que puedas presentar tus productos o servicios desde un enlace, redes o WhatsApp.",
    includes: [
      "Organización por categorías",
      "Fichas visuales de productos o servicios",
      "Diseño adaptable a celulares",
      "Enlaces directos de consulta",
      "Estructura lista para futuras actualizaciones",
    ],
    deliverables: ["Catálogo digital publicado", "Estructura de categorías", "Enlaces de consulta"],
    order: 5,
  },
];

export function getServices(): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
