"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { useFinePointer } from "@/hooks/useMediaQuery";

const follow = { stiffness: 220, damping: 24, mass: 0.5 };

/**
 * A white disc with `mix-blend-mode: difference` that trails the cursor and inverts
 * whatever is under it. Listens on its parent, which must be `isolate` with a background.
 */
export function CursorLens() {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const x = useSpring(useMotionValue(-200), follow);
  const y = useSpring(useMotionValue(-200), follow);
  const scale = useSpring(0, { stiffness: 300, damping: 26 });
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!enabled || !host) return;

    const move = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      const targetX = event.clientX - box.left;
      const targetY = event.clientY - box.top;
      // Appear where the cursor enters instead of sliding in from the last position.
      if (scale.get() < 0.05) {
        x.jump(targetX);
        y.jump(targetY);
      }
      x.set(targetX);
      y.set(targetY);
      scale.set(1);
    };
    const leave = () => scale.set(0);

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y, scale]);

  if (!enabled) return <div ref={ref} hidden />;

  return (
    <m.div
      ref={ref}
      aria-hidden="true"
      style={{ x, y, scale }}
      className="pointer-events-none absolute top-0 left-0 z-20 -mt-16 -ml-16 size-32 rounded-full bg-white mix-blend-difference"
    />
  );
}
