import type { CSSProperties, ReactNode } from "react";
import type { PillarId } from "@/types/service";

/** Items animate in (staggered) only while their slide is active — see `.journey-screen` in globals.css. */
const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

function Check() {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-md bg-accent text-on-accent">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

function AdvisoryScreen() {
  const items = ["Objetivos del negocio", "Público ideal", "Canales correctos", "Plan de acción"];
  return (
    <div className="h-full rounded-2xl bg-[#FAFAFA] p-5 text-[#0A0A0A] sm:p-6">
      <p className="font-serif text-2xl sm:text-3xl">Plan para tu marca</p>
      <ul className="mt-4">
        {items.map((item, index) => (
          <li key={item} data-stagger style={stagger(index)} className="flex items-center gap-3 border-b border-black/10 py-3 text-sm sm:text-base">
            <Check />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WebScreen() {
  return (
    <div className="h-full overflow-hidden rounded-2xl bg-white text-[#0A0A0A]">
      <div className="flex h-6 items-center gap-1 border-b border-black/10 px-3" aria-hidden="true">
        {[0, 1, 2].map((dot) => <span key={dot} className="size-1.5 rounded-full bg-black/30" />)}
      </div>
      <div className="flex justify-between px-4 py-3 font-mono text-[11px]">
        <span>TU MARCA</span>
        <span className="text-black/50">Inicio · Servicios · Contacto</span>
      </div>
      <div data-stagger style={stagger(0)} className="mx-4 rounded-xl bg-[#0A0A0A] p-5 text-[#FAFAFA]">
        <p className="font-serif text-2xl leading-none sm:text-3xl">Tu marca,<br />en línea.</p>
        <span className="mt-3 mb-2 block h-[3px] w-9 bg-accent" />
        <span className="inline-block rounded-full bg-[#FAFAFA] px-3 py-1 text-[11px] text-[#0A0A0A]">Escribinos</span>
      </div>
      <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((card) => <span key={card} data-stagger style={stagger(card)} className="h-14 rounded-lg bg-[#EFEFEF]" />)}
      </div>
    </div>
  );
}

function ContentScreen() {
  const tiles = ["#EFEFEF", "#3A3A3A", "#FAFAFA", "#2A2A2A", "var(--accent)", "#BDBDBD", "#FAFAFA", "#3A3A3A", "transparent"];
  return (
    <div className="flex h-full flex-col rounded-2xl bg-[#1A1A1A] p-4 text-[#FAFAFA] sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="size-7 rounded-full bg-accent" />
        <span className="flex-1 font-mono text-[11px]">@tumarca</span>
        <span className="rounded-full bg-[#FAFAFA] px-3 py-1 text-[11px] text-[#0A0A0A]">Seguir</span>
      </div>
      {/* Rows share the remaining height so the 3×3 feed always fits the device. */}
      <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-1.5">
        {tiles.map((color, index) => (
          <span key={index} data-stagger style={{ ...stagger(index), background: color }} className="rounded-md border border-white/10" />
        ))}
      </div>
    </div>
  );
}

function MarketingScreen() {
  const line = "M0 150 L40 140 L80 128 L120 120 L160 92 L200 70 L240 38 L260 30";
  return (
    <div className="flex h-full flex-col rounded-2xl bg-[#1A1A1A] p-4 text-[#FAFAFA] sm:p-5">
      <div className="flex gap-2 font-mono text-[11px]">
        <Chip>Alcance ↑</Chip>
        <Chip>Consultas ↑</Chip>
      </div>
      <svg viewBox="0 0 260 170" className="mt-3 w-full flex-1" preserveAspectRatio="none" aria-hidden="true">
        {[60, 110, 160].map((y) => <line key={y} x1="0" x2="260" y1={y} y2={y} stroke="#FAFAFA" strokeOpacity={y === 160 ? 0.25 : 0.08} />)}
        <path d={`${line} L260 160 L0 160 Z`} fill="var(--accent)" fillOpacity="0.2" />
        <path className="draw-line" d={line} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="240" cy="38" r="4" fill="#FAFAFA" />
      </svg>
      <p className="mt-2 font-mono text-[11px] text-white/60">Medimos qué funciona y lo mejoramos.</p>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-white/10 px-3 py-1">{children}</span>;
}

const screens: Record<PillarId, () => ReactNode> = {
  asesoria: AdvisoryScreen,
  web: WebScreen,
  contenido: ContentScreen,
  marketing: MarketingScreen,
};

export function JourneyScreen({ id }: { id: PillarId }) {
  const Screen = screens[id];
  return (
    <div className="journey-screen h-full p-3 sm:p-4">
      <Screen />
    </div>
  );
}
