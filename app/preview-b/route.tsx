import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const dynamic = "force-static"

export async function GET() {
  const f = (n: string) => readFile(join(process.cwd(), "app", "_fonts", n))
  const [serif, serifItalic, mono, photo] = await Promise.all([
    f("InstrumentSerif-Regular.ttf"),
    f("InstrumentSerif-Italic.ttf"),
    f("IBMPlexMono-Regular.ttf"),
    readFile(join(process.cwd(), "public", "og-panel.jpg")),
  ])
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`
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
        {/* LEFT - branded panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 36,
            width: 900,
            height: "100%",
            padding: "76px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: 19,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: TEAL,
            }}
          >
            andrei.iacob.co.uk
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Instrument Serif",
                fontSize: 122,
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              Andrei
              <span
                style={{
                  fontFamily: "Instrument Serif",
                  fontStyle: "italic",
                  color: TEAL,
                  marginLeft: 18,
                }}
              >
                Iacob
              </span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 12,
                fontFamily: "Instrument Serif",
                fontStyle: "italic",
                fontSize: 37,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
                color: "rgba(244,247,250,0.72)",
              }}
            >
              I build web apps and look after the servers they run on.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: 15,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "rgba(244,247,250,0.5)",
            }}
          >
            Software Developer · BSc Computer Science
          </div>
        </div>

        {/* RIGHT - photo */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 300,
            height: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={456}
            height={630}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt=""
          />
          {/* Left-edge fade so photo melts into the panel - no hard seam */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              background:
                "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.35) 16%, rgba(10,10,10,0) 42%)",
            }}
          />
          {/* Thin teal seam */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 2,
              height: "100%",
              display: "flex",
              background:
                "linear-gradient(to bottom, rgba(45,212,191,0), rgba(45,212,191,0.55), rgba(45,212,191,0))",
            }}
          />
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
