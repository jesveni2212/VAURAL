import type { ReactNode } from "react";
import { buildWhatsAppUrl, type WhatsAppMessageInput } from "@/lib/whatsapp";

type WhatsAppLinkProps = {
  input: WhatsAppMessageInput;
  children: ReactNode;
  className?: string;
};

export function WhatsAppLink({ input, children, className = "underline underline-offset-4" }: WhatsAppLinkProps) {
  let href: string | null = null;

  try {
    href = buildWhatsAppUrl(input);
  } catch {
    href = null;
  }

  if (!href) return <span className="text-sm text-danger">Configurá el número de WhatsApp para continuar.</span>;

  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}
