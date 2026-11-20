"use client";

import type { PointerEvent, ReactNode } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { useFinePointer } from "@/hooks/useMediaQuery";

type MagneticProps = {
  children: ReactNode;
  /** Fraction of the cursor offset the element follows. */
  strength?: number;
  /** Must include a display value (default `inline-block`). */
  className?: string;
};

const spring = { stiffness: 260, damping: 18, mass: 0.4 };

/** Pulls its child gently towards the cursor; inert on touch screens and with reduced motion. */
export function Magnetic({ children, strength = 0.3, className = "inline-block" }: MagneticProps) {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const x = useSpring(offsetX, spring);
  const y = useSpring(offsetY, spring);
  const active = finePointer && !reducedMotion;

  function follow(event: PointerEvent<HTMLSpanElement>) {
    if (!active) return;
    const box = event.currentTarget.getBoundingClientRect();
    offsetX.set((event.clientX - box.left - box.width / 2) * strength);
    offsetY.set((event.clientY - box.top - box.height / 2) * strength);
  }

  function release() {
    offsetX.set(0);
    offsetY.set(0);
  }

  return (
    <m.span className={className} style={{ x, y }} onPointerMove={follow} onPointerLeave={release}>
      {children}
    </m.span>
  );
}
