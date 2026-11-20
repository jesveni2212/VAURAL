"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import type { PillarId } from "@/types/service";
import { JourneyScreen } from "./JourneyScreens";
import "swiper/css";

export const JOURNEY_AUTOPLAY_MS = 3200;

export type JourneySliderProps = {
  pillars: PillarId[];
  labels: string[];
  active: number;
  autoplay: boolean;
  /** Holds autoplay (pause button or keyboard focus in the journey). */
  paused: boolean;
  onChange: (index: number) => void;
  /** 0..1 elapsed share of the current autoplay delay. */
  onProgress: (progress: number) => void;
};

/** The device screens: swipeable, keyboard-driven and auto-advancing. Loaded lazily by HeroJourney. */
export default function JourneySlider({ pillars, labels, active, autoplay, paused, onChange, onProgress }: JourneySliderProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  // Refs keep the handlers stable for Swiper while always calling the latest callbacks.
  const onChangeRef = useRef(onChange);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onChangeRef.current = onChange;
    onProgressRef.current = onProgress;
  });

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!autoplay || !swiper?.autoplay) return;
    if (paused) swiper.autoplay.pause();
    else if (swiper.autoplay.paused) swiper.autoplay.resume();
  }, [autoplay, paused]);

  // Steps clicked outside the slider drive it here.
  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper && swiper.realIndex !== active) swiper.slideToLoop(active);
  }, [active]);

  return (
    <Swiper
      modules={[Autoplay, Keyboard, A11y]}
      className="h-full"
      loop
      speed={700}
      grabCursor
      autoplay={autoplay ? { delay: JOURNEY_AUTOPLAY_MS, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
      keyboard={{ enabled: true, onlyInViewport: true }}
      a11y={{
        prevSlideMessage: "Etapa anterior",
        nextSlideMessage: "Etapa siguiente",
        slideLabelMessage: "Etapa {{index}} de {{slidesLength}}",
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      // Event props, not the `on` option: the React wrapper replaces `on` with its own handlers.
      onSlideChange={(swiper) => onChangeRef.current(swiper.realIndex)}
      onAutoplayTimeLeft={(_swiper, _timeLeft, remaining) => onProgressRef.current(1 - remaining)}
    >
      {pillars.map((id, index) => (
        <SwiperSlide key={id} aria-label={labels[index]}>
          <JourneyScreen id={id} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
