import { ImageResponse } from "next/og";
import { getServices } from "@/data/services";
import { pillarAccent } from "@/components/services/pillar-theme";

export const alt = "VAURAL — Agencia digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const services = getServices();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 82px",
          background: "#FAFAFA",
          color: "#0A0A0A",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 6, fontFamily: "sans-serif" }}>
          <span style={{ width: 14, height: 14, borderRadius: 99, background: pillarAccent.asesoria }} />
          VAURAL
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 0.95, letterSpacing: -3 }}>
          <span>De la idea</span>
          <span style={{ display: "flex", gap: 24 }}>
            al
            <span style={{ background: pillarAccent.asesoria, padding: "0 16px", fontStyle: "italic" }}>cliente.</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 34, fontSize: 24, fontFamily: "sans-serif", letterSpacing: 2 }}>
          {services.map((service) => (
            <span key={service.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 12, height: 12, borderRadius: 99, background: pillarAccent[service.id] }} />
              {service.title}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
