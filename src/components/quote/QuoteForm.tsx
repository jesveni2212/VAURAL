"use client";

import { FormEvent, useState } from "react";
import type { Service } from "@/types/service";
import { buildWhatsAppUrl, type WhatsAppMessageInput } from "@/lib/whatsapp";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";

type QuoteFormProps = {
  selectedServices: Service[];
};

type FormValues = {
  name: string;
  business: string;
  email: string;
  objective: string;
};

type FormErrors = Partial<Record<keyof FormValues | "services", string>>;

const initialValues: FormValues = {
  name: "",
  business: "",
  email: "",
  objective: "",
};

export function QuoteForm({ selectedServices }: QuoteFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedInput, setSubmittedInput] = useState<WhatsAppMessageInput | null>(null);
  const [status, setStatus] = useState("");

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("");
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) nextErrors.name = "Ingresá tu nombre.";
    if (!selectedServices.length) nextErrors.services = "Seleccioná al menos un servicio.";
    if (!values.objective.trim()) nextErrors.objective = "Contanos brevemente qué necesitás lograr.";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Revisá el formato del correo.";

    return nextErrors;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus("Revisá los campos marcados antes de continuar.");
      return;
    }

    const input: WhatsAppMessageInput = {
      phoneNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
      name: values.name,
      business: values.business,
      email: values.email,
      objective: values.objective,
      services: selectedServices.map((service) => service.title),
    };

    try {
      const url = buildWhatsAppUrl(input);
      const popup = window.open(url, "_blank", "noopener,noreferrer");
      setSubmittedInput(input);
      setStatus(popup ? "WhatsApp se abrió con tu consulta preparada." : "El navegador bloqueó la apertura automática. Usá el enlace para continuar.");
    } catch {
      setStatus("No pudimos preparar WhatsApp. Revisá la configuración del número.");
    }
  }

  return (
    <form className="quote-form" onSubmit={submit} noValidate>
      <div className="selected-form-services">
        <span className="field-label">Servicios seleccionados</span>
        {selectedServices.length ? (
          <div className="form-service-list">
            {selectedServices.map((service) => <span key={service.id}>{service.title}</span>)}
          </div>
        ) : (
          <p className="field-help">Todavía no seleccionaste un servicio desde el catálogo.</p>
        )}
        {errors.services ? <p className="field-error">{errors.services}</p> : null}
      </div>

      <div className="form-fields-grid">
        <label className="field">
          <span className="field-label">Nombre</span>
          <input value={values.name} onChange={(event) => updateValue("name", event.target.value)} aria-invalid={Boolean(errors.name)} placeholder="Tu nombre" />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </label>
        <label className="field">
          <span className="field-label">Empresa o negocio</span>
          <input value={values.business} onChange={(event) => updateValue("business", event.target.value)} placeholder="Nombre de tu negocio" />
        </label>
        <label className="field">
          <span className="field-label">Correo electrónico <small>opcional</small></span>
          <input type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} aria-invalid={Boolean(errors.email)} placeholder="tu@correo.com" />
          {errors.email ? <span className="field-error">{errors.email}</span> : null}
        </label>
        <label className="field field-full">
          <span className="field-label">Objetivo del proyecto</span>
          <textarea value={values.objective} onChange={(event) => updateValue("objective", event.target.value)} aria-invalid={Boolean(errors.objective)} placeholder="¿Qué te gustaría lograr?" />
          {errors.objective ? <span className="field-error">{errors.objective}</span> : null}
        </label>
      </div>

      <p className="form-note">No mostramos precios en la web. Te orientamos y preparamos una cotización personalizada por WhatsApp.</p>
      <button className="button button-primary form-submit" type="submit">Continuar por WhatsApp <span aria-hidden="true">↗</span></button>
      {status ? <p className={`form-status${status.startsWith("No") ? " form-status-error" : ""}`} role="status">{status}</p> : null}
      {submittedInput ? <WhatsAppLink input={submittedInput}>Abrir WhatsApp nuevamente ↗</WhatsAppLink> : null}
    </form>
  );
}
