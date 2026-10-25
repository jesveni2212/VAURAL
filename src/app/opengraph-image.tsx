import { ImageResponse } from "next/og";

export const alt = "VAURAL — Páginas web y contenido digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #0b1016 0%, #202b38 58%, #11161d 100%)",
          color: "#f6f8fb",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#c8d4e3", fontSize: 28, letterSpacing: 5 }}>
          <span style={{ border: "1px solid #8b9bb0", padding: "9px 12px", fontSize: 20 }}>V/L</span>
          VAURAL
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ color: "#c8d4e3", fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>Estudio digital</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 78, lineHeight: 0.98, fontWeight: 800, letterSpacing: -4 }}>Tu negocio,<br />en su mejor versión digital.</div>
          <div style={{ color: "#c0c8d3", fontSize: 26 }}>Páginas web · Contenido para redes · Catálogos digitales</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#98a9bf", fontSize: 20, letterSpacing: 3 }}>
          <span>ASUNCIÓN · PARAGUAY</span>
          <span>VAURAL</span>
        </div>
      </div>
    ),
    size,
  );
}
