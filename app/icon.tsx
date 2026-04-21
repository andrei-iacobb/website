import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0f1117",
          borderRadius: 7,
          border: "1px solid #1e2530",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <span
          style={{
            color: "#f0f4f8",
            fontSize: 18,
            fontWeight: 900,
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
            marginBottom: 3,
          }}
        >
          A
        </span>
        <div
          style={{
            width: 14,
            height: 2,
            borderRadius: 1,
            background: "#2dd4bf",
          }}
        />
      </div>
    ),
    { ...size }
  )
}
