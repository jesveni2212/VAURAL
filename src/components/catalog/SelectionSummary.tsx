"use client";

import { useSelection } from "@/components/providers/SelectionProvider";

export function SelectionSummary() {
  const { selectedServices, removeService, clearSelection } = useSelection();

  if (!selectedServices.length) {
    return (
      <aside className="selection-summary selection-summary-empty" aria-live="polite">
        <span className="section-kicker">Tu consulta</span>
        <p>Seleccioná uno o varios servicios para preparar una consulta personalizada.</p>
      </aside>
    );
  }

  return (
    <aside className="selection-summary" aria-live="polite" aria-labelledby="selection-title">
      <div>
        <span className="section-kicker">Tu consulta</span>
        <h3 id="selection-title">Elegiste {selectedServices.length} servicio{selectedServices.length === 1 ? "" : "s"}.</h3>
        <div className="selected-service-list">
          {selectedServices.map((service) => (
            <button key={service.id} type="button" onClick={() => removeService(service.id)}>
              {service.title}<span aria-hidden="true">×</span>
            </button>
          ))}
        </div>
      </div>
      <div className="selection-summary-actions">
        <button className="text-button" type="button" onClick={clearSelection}>Limpiar selección</button>
        <a className="button button-primary" href="#contacto">Continuar con mi consulta</a>
      </div>
    </aside>
  );
}
