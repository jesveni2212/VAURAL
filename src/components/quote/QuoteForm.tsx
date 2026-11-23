"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import type { Service } from "@/types/service";
import { siteConfig } from "@/data/site";
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
      phoneNumber: siteConfig.whatsappNumber,
      name: values.name,
      business: values.business,
      email: values.email,
      objective: values.objective,
      services: selectedServices.map((service) => service.title),
    };

    try {
      const url = buildWhatsAppUrl(input);
      // With "noopener" window.open always returns null, so its result can't tell whether a popup was blocked.
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmittedInput(input);
      setStatus("Abrimos WhatsApp con tu consulta preparada. Si no se abrió, usá el enlace de abajo.");
    } catch {
      setStatus("No pudimos preparar WhatsApp. Revisá la configuración del número.");
    }
  }

  return (
    <form className="reveal rounded-3xl border border-line bg-bg p-6 md:p-9" onSubmit={submit} noValidate>
      <div>
        <span className="label-mono text-muted">Planes seleccionados</span>
        {selectedServices.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedServices.map((service) => (
              <span key={service.id} className="rounded-full bg-fg px-3 py-1 text-sm text-bg">
                {service.title}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-muted">
            Todavía no elegiste un plan. <a href="#planes" className="text-fg underline underline-offset-4">Elegilo acá</a>.
          </p>
        )}
        <FieldError message={errors.services} />
      </div>

      <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Field label="Nombre" error={errors.name}>
          <input className={inputClass} value={values.name} onChange={(event) => updateValue("name", event.target.value)} aria-invalid={Boolean(errors.name)} placeholder="Tu nombre" autoComplete="name" />
        </Field>
        <Field label="Empresa o negocio">
          <input className={inputClass} value={values.business} onChange={(event) => updateValue("business", event.target.value)} placeholder="Nombre de tu negocio" autoComplete="organization" />
        </Field>
        <Field label="Correo electrónico (opcional)" error={errors.email} wide>
          <input className={inputClass} type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} aria-invalid={Boolean(errors.email)} placeholder="tu@correo.com" autoComplete="email" />
        </Field>
        <Field label="Objetivo del proyecto" error={errors.objective} wide>
          <textarea className={`${inputClass} min-h-28 resize-y`} value={values.objective} onChange={(event) => updateValue("objective", event.target.value)} aria-invalid={Boolean(errors.objective)} placeholder="¿Qué te gustaría lograr?" />
        </Field>
      </div>

      <p className="mt-7 text-sm text-muted">No mostramos precios en la web. Te orientamos y preparamos una cotización personalizada por WhatsApp.</p>
      <Magnetic className="mt-6 inline-block">
        <button className="rounded-full bg-fg px-7 py-4 font-medium text-bg transition-colors duration-300 hover:bg-accent hover:text-on-accent" type="submit">
          Continuar por WhatsApp
        </button>
      </Magnetic>
      {status ? (
        <p className={`mt-4 text-sm ${status.startsWith("No") ? "text-danger" : "text-muted"}`} role="status">
          {status}
        </p>
      ) : null}
      {submittedInput ? (
        <WhatsAppLink input={submittedInput} className="mt-2 inline-block text-sm underline underline-offset-4">
          Abrir WhatsApp nuevamente
        </WhatsAppLink>
      ) : null}
    </form>
  );
}

const inputClass = "w-full border-0 border-b border-line bg-transparent py-2.5 text-lg outline-none placeholder:text-muted/70";

function Field({ label, error, wide = false, children }: { label: string; error?: string; wide?: boolean; children: ReactNode }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="label-mono text-muted">{label}</span>
      <span className="field-line mt-1">{children}</span>
      <FieldError message={error} />
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <span className="mt-2 block text-sm text-danger">{message}</span> : null;
}
