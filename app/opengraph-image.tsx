import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Andrei Iacob - Software Developer"

export default async function OpengraphImage() {
  const f = (n: string) => readFile(join(process.cwd(), "app", "_fonts", n))
  const [serif, mono] = await Promise.all([
    f("InstrumentSerif-Regular.ttf"),
    f("IBMPlexMono-Regular.ttf"),
  ])

  const INK = "#1b1e24" // --ink - the site's near-black text color
  const INK_MUTED = "rgba(27,30,36,0.65)" // matches text-ink/65 used across the page
  const CLAY = "rgb(213, 70, 26)" // hsl(14 78% 47%) - the site's --accent (status dot, hovers)

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "#f6f2e9",
          backgroundImage:
            "radial-gradient(1000px circle at 8% -10%, #fcf9f3 0%, #f6f2e9 45%, #efe9dc 100%), radial-gradient(900px circle at 104% 112%, rgba(213,70,26,0.08), transparent 56%)",
          color: INK,
          padding: 72,
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {/* Eyebrow - mirrors the hero kicker (mono, uppercase, wide-tracked) */}
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: 40,
            letterSpacing: 2,
            color: INK_MUTED,
          }}
        >
          SOFTWARE DEVELOPER - BURY ST EDMUNDS, UK
        </div>

        {/* Masthead - huge near-black name (closest available font to Bricolage Grotesque) */}
        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: 172,
            lineHeight: 0.95,
            letterSpacing: -5,
            color: INK,
          }}
        >
          Andrei Iacob
        </div>

        {/* Bottom - status dot + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 18,
              height: 18,
              marginRight: 16,
              borderRadius: "50%",
              backgroundColor: CLAY,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: 40,
              letterSpacing: 2,
              color: INK_MUTED,
            }}
          >
            andrei.iacob.co.uk
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "IBM Plex Mono", data: mono, style: "normal", weight: 400 },
      ],
    }
  )
}
