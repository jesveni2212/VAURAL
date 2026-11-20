import { getServices } from "@/data/services";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroJourney } from "@/components/hero/HeroJourney";
import { PillarBand } from "@/components/services/PillarBand";
import { PlansIndex } from "@/components/services/PlansIndex";
import { ContactSection } from "@/components/contact/ContactSection";

export default function HomePage() {
  const services = getServices();

  return (
    <>
      <SiteHeader />
      <main>
        <HeroJourney services={services} />
        <PillarBand services={services} />
        <PlansIndex services={services} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
