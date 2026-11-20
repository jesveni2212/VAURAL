import { QuoteSection } from "@/components/quote/QuoteSection";
import { SplitWords } from "@/components/motion/SplitWords";

export function ContactSection() {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="bg-surface">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:py-32">
        <div className="reveal">
          <p className="label-mono text-muted">Contacto</p>
          <h2 id="contact-title" className="mt-4 font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.95]">
            <SplitWords text={"Contanos qué\nquerés lograr."} highlight="lograr." highlightClassName="marker" />
          </h2>
          <p className="mt-6 max-w-md text-muted">
            Elegí los planes que te interesan, completá estos datos y seguimos la conversación por WhatsApp. Sin compromiso y sin precios
            cerrados: te orientamos según tu proyecto.
          </p>
        </div>
        <QuoteSection />
      </div>
    </section>
  );
}
