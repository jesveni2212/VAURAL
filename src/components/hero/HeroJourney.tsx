"use client";

import { type FocusEvent, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import type { Service } from "@/types/service";
import { setBaseAccent } from "@/lib/accent";
import { padNumber } from "@/lib/format";
import { pillarAccent, pillarShortLabel } from "@/components/services/pillar-theme";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitWords } from "@/components/motion/SplitWords";
import { IconArrow, IconPause, IconPlay } from "@/components/ui/icons";
import { CursorLens } from "./CursorLens";
import { JourneyScreen } from "./JourneyScreens";

// Swiper is fetched after the page is interactive; until it is ready (and without JS)
// HeroJourney paints the active step's screen itself.
const JourneySlider = dynamic(() => import("./JourneySlider"), { ssr: false });

type HeroJourneyProps = {
  services: Service[];
};

export function HeroJourney({ services }: HeroJourneyProps) {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [keyboardInside, setKeyboardInside] = useState(false);
  const [sliderReady, setSliderReady] = useState(false);
  const autoplay = !useReducedMotion();
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pointerDown = useRef(false);
  const current = services[active];
  // WCAG 2.2.2: auto-advancing content can be paused, and never moves under a keyboard user.
  const paused = userPaused || keyboardInside;

  // Focus that follows a click/tap is not keyboard focus: flag the pointer for the current task only.
  function markPointer() {
    pointerDown.current = true;
    setTimeout(() => {
      pointerDown.current = false;
    }, 0);
  }

  function trackKeyboardFocus() {
    if (!pointerDown.current) setKeyboardInside(true);
  }

  function releaseKeyboardFocus(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardInside(false);
  }

  useEffect(() => {
    setBaseAccent(pillarAccent[current.id]);
  }, [current.id]);

  // Past steps full, upcoming empty; the active one is filled by autoplay (or full without it).
  useEffect(() => {
    stepRefs.current.forEach((step, index) => {
      const filled = index < active || (index === active && !autoplay);
      step?.style.setProperty("--progress", filled ? "1" : "0");
    });
  }, [active, autoplay]);

  // Written straight to the active step's CSS var: no re-render on every autoplay frame.
  function showProgress(progress: number) {
    stepRefs.current[active]?.style.setProperty("--progress", String(progress));
  }

  return (
    <section
      id="recorrido"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-bg"
      onPointerDown={markPointer}
      onFocus={trackKeyboardFocus}
      onBlur={releaseKeyboardFocus}
    >
      <Orbits />
      <CursorLens />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pt-32 pb-20 md:grid-cols-[1fr_1.05fr] md:px-8 lg:gap-16 lg:pt-40 lg:pb-28">
        <div>
          <p className="label-mono text-muted">Agencia digital · Asunción</p>
          <h1 id="hero-title" className="mt-5 font-serif text-[clamp(3.25rem,7.5vw,6.5rem)] leading-[0.95] tracking-tight">
            <SplitWords text={"De la idea\nal cliente."} highlight="cliente." highlightClassName="marker" />
          </h1>

          <div className="mt-9 min-h-32">
            <p className="label-mono text-muted">
              {padNumber(active + 1)} / {padNumber(services.length)}
            </p>
            <p key={current.id} className="word-rise mt-2 font-serif text-3xl">
              {current.title}
            </p>
            <p className="mt-2 max-w-md text-muted">{current.shortDescription}</p>
          </div>

          <div className="mt-6 grid grid-cols-[repeat(4,1fr)_auto] items-start gap-2" aria-label="Etapas del recorrido">
            {services.map((service, index) => (
              <button
                key={service.id}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                type="button"
                aria-current={index === active ? "step" : undefined}
                onClick={() => setActive(index)}
                className={`journey-step label-mono relative border-t-2 border-line pt-3 text-left transition-colors ${
                  index === active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {index === active ? <span className="mr-1.5 inline-block size-1.5 bg-accent align-middle" /> : null}
                {pillarShortLabel[service.id]}
              </button>
            ))}
            {autoplay ? (
              <button
                type="button"
                aria-label="Pausar recorrido"
                aria-pressed={userPaused}
                title={userPaused ? "Reanudar recorrido" : "Pausar recorrido"}
                onClick={() => setUserPaused((value) => !value)}
                className="-mt-1 ml-1 grid size-8 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-fg hover:text-bg"
              >
                {userPaused ? <IconPlay className="size-3.5" /> : <IconPause className="size-3.5" />}
              </button>
            ) : null}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <a href="#contacto" className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 font-medium text-bg transition-colors duration-300 hover:bg-accent hover:text-on-accent">
                Empezar mi proyecto
                <IconArrow className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#planes" className="inline-flex rounded-full border border-fg px-6 py-3.5 font-medium transition-colors duration-300 hover:bg-fg hover:text-bg">
                Ver planes
              </a>
            </Magnetic>
          </div>
        </div>

        <div
          data-testid="journey-device"
          data-paused={paused}
          className="relative aspect-[4/3.6] overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0A0A] outline-1 outline-offset-8 outline-accent sm:aspect-[4/3.3]"
        >
          {sliderReady ? null : (
            <div className="absolute inset-0">
              <JourneyScreen id={current.id} />
            </div>
          )}
          <JourneySlider
            pillars={services.map((service) => service.id)}
            labels={services.map((service) => service.title)}
            active={active}
            autoplay={autoplay}
            paused={paused}
            onChange={setActive}
            onProgress={showProgress}
            onReady={() => setSliderReady(true)}
          />
        </div>
      </div>
    </section>
  );
}

function Orbits() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-40 -right-44 size-[30rem] animate-orbit rounded-full border border-line">
        <span className="absolute -top-1.5 left-1/2 size-3 rounded-full bg-accent" />
      </div>
      <div className="absolute -bottom-48 -left-32 size-80 animate-orbit-reverse rounded-full border border-line">
        <span className="absolute top-1/2 -right-1 size-2 rounded-full bg-fg" />
      </div>
    </div>
  );
}
