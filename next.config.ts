import type { NextConfig } from "next";

/** Service URLs from the first catalogue, folded into the four pillars. */
const legacyServiceRedirects: Record<string, string> = {
  "web-informativa": "paginas-web",
  "web-interactiva": "paginas-web",
  "tienda-pedidos-whatsapp": "paginas-web",
  "catalogo-digital": "paginas-web",
  "contenido-redes": "contenido-para-redes",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async redirects() {
    return Object.entries(legacyServiceRedirects).map(([from, to]) => ({
      source: `/servicios/${from}`,
      destination: `/servicios/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
