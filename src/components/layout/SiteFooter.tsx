import { siteConfig } from "@/data/site";
import { VauralLogo } from "@/components/brand/VauralLogo";
import { CopyButton } from "@/components/contact/CopyButton";

/** "595992396700" → "+595 992 396 700" */
function formatPhone(number: string): string {
  const digits = number.replace(/\D/g, "");
  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`.trim();
}

export function SiteFooter() {
  const phone = formatPhone(siteConfig.whatsappNumber);

  return (
    <footer className="bg-fg text-bg">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <VauralLogo className="h-8 w-auto" />
          <p className="mt-4 max-w-xs opacity-70">Agencia digital en Asunción. Asesoría, páginas web, contenido para redes y marketing digital.</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <p className="label-mono opacity-60">WhatsApp</p>
          <div className="flex items-center gap-3 [&_button]:border-bg/25 [&_button:hover]:bg-bg [&_button:hover]:text-fg">
            <span className="font-serif text-3xl">{phone}</span>
            <CopyButton value={`+${siteConfig.whatsappNumber}`} label="Copiar número de WhatsApp" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl justify-between border-t border-bg/15 py-5 pr-24 pl-5 md:pr-28 md:pl-8">
        <span className="label-mono opacity-60">© {new Date().getFullYear()} VAURAL</span>
        <a href="#recorrido" className="label-mono opacity-60 transition-opacity hover:opacity-100">
          Volver arriba ↑
        </a>
      </div>
    </footer>
  );
}
