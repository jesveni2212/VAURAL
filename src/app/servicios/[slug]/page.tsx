import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/data/services";
import { siteConfig } from "@/data/site";
import { ServiceDetailActions } from "@/components/catalog/ServiceDetailActions";

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

  return (
    <main className="detail-page">
      <div className="wrap detail-shell">
        <Link className="detail-back" href="/#servicios">← Volver a servicios</Link>
        <div className="detail-kicker">VAURAL / {service.category}</div>
        <div className="detail-grid">
          <div>
            <h1>{service.title}</h1>
            <p className="detail-lead">{service.description}</p>
            <ServiceDetailActions serviceId={service.id} />
          </div>
          <aside className="detail-panel">
            <span className="section-kicker">Incluye</span>
            <ul>
              {service.includes.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <span className="section-kicker">Entregables</span>
            <ul>
              {service.deliverables.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="detail-note">La propuesta final se define según el alcance de tu proyecto. Consultanos por WhatsApp para recibir orientación y cotización.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
