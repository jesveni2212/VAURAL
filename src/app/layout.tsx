import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { SelectionProvider } from "@/components/providers/SelectionProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VAURAL — Páginas web y contenido digital",
    template: "%s | VAURAL",
  },
  description: siteConfig.description,
  openGraph: {
    title: "VAURAL — Páginas web y contenido digital",
    description: siteConfig.description,
    type: "website",
    locale: "es_PY",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <SelectionProvider>{children}</SelectionProvider>
      </body>
    </html>
  );
}
