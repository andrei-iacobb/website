import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Andrei Gabriel Iacob - Developer & Computer Science Student"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b1120",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "60%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "rgba(45, 212, 191, 0.08)",
            filter: "blur(100px)",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#2dd4bf",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Computer Science Student
          </div>

          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.05,
              letterSpacing: "-2px",
            }}
          >
            Andrei Gabriel
            <br />
            Iacob
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.5,
              maxWidth: "600px",
            }}
          >
            I build things for the web.
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "8px",
              fontSize: "16px",
              color: "#64748b",
            }}
          >
            <span>andrei.iacob.co.uk</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
