import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { SelectionProvider } from "@/components/providers/SelectionProvider";
import { FloatingWhatsApp } from "@/components/whatsapp/FloatingWhatsApp";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VAURAL — Páginas web y contenido digital",
    template: "%s | VAURAL",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "VAURAL — Páginas web y contenido digital",
    description: siteConfig.description,
    type: "website",
    locale: "es_PY",
    siteName: "VAURAL",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VAURAL — Páginas web y contenido digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VAURAL — Páginas web y contenido digital",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <SelectionProvider>{children}</SelectionProvider>
        <FloatingWhatsApp />
        <StructuredData />
      </body>
    </html>
  );
}
