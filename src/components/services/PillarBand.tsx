import type { Service } from "@/types/service";
import { pillarAccent, pillarShortLabel } from "./pillar-theme";

const COPIES = 2; // the track moves by -50%, so two identical halves loop seamlessly
const REPEAT_PER_COPY = 3; // wide enough to cover large screens

/** Decorative marquee of the four pillars with their colour; pauses on hover. */
export function PillarBand({ services }: { services: Service[] }) {
  const sequence = Array.from({ length: REPEAT_PER_COPY }, () => services).flat();

  return (
    <div aria-hidden="true" className="group overflow-hidden border-y border-line bg-bg py-4">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {sequence.map((service, index) => (
              <span key={`${service.id}-${index}`} className="label-mono flex items-center gap-8 pr-8 text-sm">
                {pillarShortLabel[service.id]}
                <span className="size-2 rounded-full" style={{ background: pillarAccent[service.id] }} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
