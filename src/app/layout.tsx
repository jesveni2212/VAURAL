import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { siteConfig } from "@/data/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SelectionProvider } from "@/components/providers/SelectionProvider";
import { FloatingWhatsApp } from "@/components/whatsapp/FloatingWhatsApp";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const title = "VAURAL — Agencia digital";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: "%s | VAURAL" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title,
    description: siteConfig.description,
    type: "website",
    locale: "es_PY",
    siteName: "VAURAL",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <MotionProvider>
          <SelectionProvider>{children}</SelectionProvider>
        </MotionProvider>
        <FloatingWhatsApp />
        <StructuredData />
      </body>
    </html>
  );
}
