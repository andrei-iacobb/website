import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const dynamic = "force-static"

export async function GET() {
  const f = (n: string) => readFile(join(process.cwd(), "app", "_fonts", n))
  const [serif, serifItalic, mono] = await Promise.all([
    f("InstrumentSerif-Regular.ttf"),
    f("InstrumentSerif-Italic.ttf"),
    f("IBMPlexMono-Regular.ttf"),
  ])

  const TEAL = "hsl(175, 84%, 58%)"

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#f4f7fa",
          overflow: "hidden",
        }}
      >
        {/* Soft teal glow, top-right */}
        <div
          style={{
            position: "absolute",
            right: -220,
            top: -240,
            width: 720,
            height: 720,
            borderRadius: 720,
            background:
              "radial-gradient(circle, rgba(45,212,191,0.14) 0%, rgba(45,212,191,0.05) 38%, rgba(10,10,10,0) 70%)",
          }}
        />

        {/* Hairline frame */}
        <div
          style={{
            position: "absolute",
            inset: 40,
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 26,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: 82,
          }}
        >
          {/* Kicker */}
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: TEAL,
            }}
          >
            andrei.iacob.co.uk
          </div>

          {/* Name + tagline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Instrument Serif",
                fontSize: 132,
                lineHeight: 0.95,
                letterSpacing: -2,
              }}
            >
              Andrei
              <span
                style={{
                  fontFamily: "Instrument Serif",
                  fontStyle: "italic",
                  color: TEAL,
                  marginLeft: 22,
                }}
              >
                Iacob
              </span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontFamily: "Instrument Serif",
                fontStyle: "italic",
                fontSize: 40,
                lineHeight: 1.25,
                color: "rgba(244,247,250,0.72)",
                maxWidth: 760,
              }}
            >
              I build web apps and look after the servers they run on.
            </div>
          </div>

          {/* Footer meta */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "IBM Plex Mono",
              fontSize: 16,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "rgba(244,247,250,0.5)",
            }}
          >
            <div style={{ display: "flex" }}>
              Software Developer · BSc Computer Science
            </div>
            <div style={{ display: "flex", color: "rgba(244,247,250,0.38)" }}>
              Bury St Edmunds · UK
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "IBM Plex Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  )
}
