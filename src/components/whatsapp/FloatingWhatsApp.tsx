import { buildWhatsAppQuickUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/data/site";

const message = "Hola, quiero consultar por los servicios de VAURAL";

export function FloatingWhatsApp() {
  let href: string;

  try {
    href = buildWhatsAppQuickUrl(siteConfig.whatsappNumber, message);
  } catch {
    return null;
  }

  return (
    <a
      className="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp para consultar por los servicios de VAURAL"
      title="Consultanos por WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 4.1a11.8 11.8 0 0 0-10.1 18l-1.2 4.5 4.6-1.2A11.8 11.8 0 1 0 16 4.1Z" />
        <path d="M11.9 10.6c.2-.4.4-.4.8-.4h.7c.2 0 .5.1.6.5l.9 2.2c.1.3.1.5-.1.8l-.6.8c-.2.2-.3.4-.1.7.3.6 1 1.5 1.8 2.1.9.8 1.7 1.1 2 .9l.8-.4c.3-.2.5-.1.8 0l2.1 1c.3.2.4.3.4.6 0 .4-.2 1.3-.7 1.6-.5.4-1.1.5-1.8.3-1.2-.3-2.8-1.2-4.4-2.6-1.2-1.1-2.1-2.3-2.7-3.4-.6-1-.9-2-.9-2.7 0-.8.3-1.5.4-1.9Z" />
      </svg>
    </a>
  );
}
