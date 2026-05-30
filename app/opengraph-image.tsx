import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Andrei Iacob - Software Developer"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0c10",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5eead4",
            fontFamily: "monospace",
          }}
        >
          andrei.iacob.co.uk
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 120,
              lineHeight: 1,
              color: "#f0f4f8",
              letterSpacing: -3,
            }}
          >
            Andrei{" "}
            <span style={{ color: "#2dd4bf", fontStyle: "italic", marginLeft: 24 }}>
              Iacob
            </span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              color: "rgba(240,244,248,0.6)",
              fontStyle: "italic",
            }}
          >
            I build web apps and look after the servers they run on.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "rgba(240,244,248,0.45)",
            fontFamily: "monospace",
          }}
        >
          Software Developer · BSc Computer Science
        </div>
      </div>
    ),
    { ...size }
  )
}
