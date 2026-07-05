import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Andrei Iacob - Software Developer"

export default async function OpengraphImage() {
  const f = (n: string) => readFile(join(process.cwd(), "app", "_fonts", n))
  const [serif, serifItalic, mono] = await Promise.all([
    f("InstrumentSerif-Regular.ttf"),
    f("InstrumentSerif-Italic.ttf"),
    f("IBMPlexMono-Regular.ttf"),
  ])

  const TEAL = "rgb(45, 212, 191)" // hsl(175 84% 55%) - the site's "Iacob" accent

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(1000px circle at 6% -8%, rgba(17,197,182,0.32), rgba(17,197,182,0.07) 32%, transparent 58%), radial-gradient(820px circle at 104% 112%, rgba(45,212,191,0.13), transparent 56%)",
          color: "#f4f7fa",
          padding: 72,
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {/* Top - wordmark, left (mirrors nav) */}
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            letterSpacing: 1,
            color: "rgba(244,247,250,0.6)",
          }}
        >
          andrei
          <span style={{ color: "rgba(244,247,250,0.35)" }}>.</span>
          iacob
        </div>

        {/* Middle - big name, right-aligned (hero masthead) */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontFamily: "Instrument Serif",
            fontSize: 150,
            lineHeight: 0.92,
            letterSpacing: -3,
          }}
        >
          Andrei
          <span
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              color: TEAL,
              marginLeft: 28,
            }}
          >
            Iacob
          </span>
        </div>

        {/* Bottom - tagline left, meta right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 38,
              lineHeight: 1.25,
              color: "rgba(244,247,250,0.72)",
              maxWidth: 460,
            }}
          >
            I build web apps and look after the servers they run on.
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: 17,
              letterSpacing: 1,
              color: "rgba(244,247,250,0.45)",
            }}
          >
            BSc Computer Science
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
        { name: "IBM Plex Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  )
}
