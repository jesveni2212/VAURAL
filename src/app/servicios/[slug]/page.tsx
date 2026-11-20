import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/data/services";
import { siteConfig } from "@/data/site";
import { VauralLogo } from "@/components/brand/VauralLogo";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ServiceDetailActions } from "@/components/services/ServiceDetailActions";
import { pillarAccent } from "@/components/services/pillar-theme";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) return {};

  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.shortDescription,
      type: "website",
      locale: "es_PY",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: `${siteConfig.url}/servicios/${service.slug}`,
    provider: { "@type": "ProfessionalService", name: siteConfig.name, url: siteConfig.url },
    areaServed: { "@type": "Country", name: "Paraguay" },
  };

  return (
    <>
      <main style={{ "--accent": pillarAccent[service.id] } as CSSProperties}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }} />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" aria-label="VAURAL, ir al inicio">
            <VauralLogo className="h-7 w-auto" />
          </Link>
          <ThemeToggle />
        </div>

        <article className="mx-auto grid max-w-7xl gap-14 px-5 pt-12 pb-24 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:pt-20">
          <div>
            <Link href="/#planes" className="label-mono text-muted hover:text-fg">
              ← Volver a los planes
            </Link>
            <p className="label-mono mt-10 flex items-center gap-2 text-muted">
              <span className="size-2 rounded-full bg-accent" />
              VAURAL · {service.disciplines.join(" · ")}
            </p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">{service.title}</h1>
            <p className="mt-6 max-w-xl text-xl text-muted">{service.description}</p>
            <ServiceDetailActions serviceId={service.id} />
          </div>

          <aside className="rounded-3xl border border-line p-7 md:p-9">
            <DetailList title="Incluye" items={service.includes} />
            <DetailList title="Entregables" items={service.deliverables} />
            <p className="mt-8 border-t border-line pt-5 text-sm text-muted">
              La propuesta final se define según el alcance de tu proyecto. Consultanos por WhatsApp para recibir orientación y cotización.
            </p>
          </aside>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="label-mono text-muted">{title}</h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-1.5 shrink-0 bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
