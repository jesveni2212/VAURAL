"use client";

import type { CSSProperties, FocusEvent, MouseEvent, Ref } from "react";
import type { Service } from "@/types/service";
import { padNumber } from "@/lib/format";
import { IconCheck } from "@/components/ui/icons";
import { pillarAccent } from "./pillar-theme";

type PlanRowProps = {
  service: Service;
  index: number;
  active: boolean;
  dimmed: boolean;
  selected: boolean;
  titleRef: Ref<HTMLAnchorElement>;
  onActivate: () => void;
  onDeactivate: () => void;
  onOpen: () => void;
  onToggle: () => void;
};

const isPlainClick = (event: MouseEvent) => event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

/**
 * One plan: fills with its pillar colour on hover/focus. The title is a real link; a plain click opens the detail instead.
 * Only the large title dims on the other rows (large text keeps ≥3:1); small text and buttons stay at full contrast.
 */
export function PlanRow({ service, index, active, dimmed, selected, titleRef, onActivate, onDeactivate, onOpen, onToggle }: PlanRowProps) {
  function leaveOnBlur(event: FocusEvent<HTMLLIElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onDeactivate();
  }

  function open(event: MouseEvent<HTMLAnchorElement>) {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    onOpen();
  }

  return (
    <li
      data-active={active}
      style={{ "--row-accent": pillarAccent[service.id] } as CSSProperties}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      onBlur={leaveOnBlur}
      className={`group relative isolate grid grid-cols-[2.5rem_1fr] items-center gap-x-4 gap-y-3 border-b border-bg/15 px-3 py-7 transition-[opacity,color] duration-500 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-(--row-accent) before:transition-transform before:duration-700 before:ease-expo data-[active=true]:text-on-accent data-[active=true]:before:scale-x-100 md:grid-cols-[3.5rem_1fr_auto] md:px-5 md:py-9`}
    >
      <span className="label-mono opacity-60">{padNumber(index + 1)}</span>

      <a
        ref={titleRef}
        href={`/servicios/${service.slug}`}
        onClick={open}
        className={`font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-none transition-[transform,opacity] duration-500 ease-expo outline-none group-data-[active=true]:translate-x-3 ${
          dimmed ? "opacity-45" : ""
        }`}
      >
        {service.title}
      </a>

      <div className="col-start-2 flex flex-wrap items-center gap-3 md:col-start-3 md:justify-end">
        <span className="label-mono opacity-70">{service.disciplines.join(" · ")}</span>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selected}
          className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
            selected
              ? "border-transparent bg-(--row-accent) text-on-accent group-data-[active=true]:bg-on-accent group-data-[active=true]:text-(--row-accent)"
              : "border-current hover:bg-current/10"
          }`}
        >
          {selected ? <IconCheck className="size-4" /> : <span aria-hidden="true" className="text-lg leading-none">+</span>}
          {selected ? "Elegido, tocá para quitar" : "Elegir este plan"}
          {" "}
          <span className="sr-only">({service.title})</span>
        </button>
      </div>
    </li>
  );
}
