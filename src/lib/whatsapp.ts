export type WhatsAppMessageInput = {
  phoneNumber: string;
  name: string;
  business?: string;
  email?: string;
  objective: string;
  services: string[];
};

function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

function optionalLine(label: string, value?: string): string[] {
  const trimmedValue = value?.trim();
  return trimmedValue ? [`${label}: ${trimmedValue}`] : [];
}

export function buildWhatsAppMessage(input: WhatsAppMessageInput): string {
  const selectedServices = input.services.length
    ? input.services.map((service) => `- ${service}`).join("\n")
    : "- Quiero conversar sobre un proyecto";

  return [
    "Hola, VAURAL. Quiero consultar por un proyecto.",
    "",
    `Nombre: ${input.name.trim()}`,
    ...optionalLine("Empresa o negocio", input.business),
    ...optionalLine("Correo", input.email),
    "",
    "Servicios de interés:",
    selectedServices,
    "",
    `Objetivo del proyecto: ${input.objective.trim()}`,
    "",
    "Me gustaría recibir orientación y cotización.",
  ].join("\n");
}

export function buildWhatsAppUrl(input: WhatsAppMessageInput): string {
  const phoneNumber = normalizePhoneNumber(input.phoneNumber);

  if (!phoneNumber) {
    throw new Error("Se necesita un número de WhatsApp válido.");
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(buildWhatsAppMessage(input))}`;
}
