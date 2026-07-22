// Hand-drawn stickman placeholders that sit under the photos while they
// load over the tunnel. Pure SVG in currentColor - the real image paints
// on top of them (the <Image> is position:relative), so there is no JS,
// no layout shift, and nothing to clean up once the photo arrives.

type Variant = "beach" | "desk" | "portrait"

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

const scenes: Record<Variant, { viewBox: string; label: string; art: React.ReactNode }> = {
  // Me on a beach at dusk, apparently
  beach: {
    viewBox: "0 0 100 125",
    label: "stickman enjoying a sunset while the real photo loads",
    art: (
      <g {...stroke}>
        {/* sun, clocking off */}
        <circle cx={72} cy={26} r={7} />
        <path d="M72 13v-4 M72 39v4 M59 26h-4 M85 26h4 M63 17l-3 -3 M81 35l3 3 M81 17l3 -3 M63 35l-3 3" />
        {/* stickman, arms up at the sea */}
        <circle cx={44} cy={54} r={8} />
        <path d="M41 56q3 3 6 0" strokeWidth={2} />
        <path d="M44 62v22 M44 68L31 56 M44 68l13 -12 M44 84l-9 18 M44 84l9 18" />
        {/* waves */}
        <path d="M12 110q5 -5 10 0t10 0t10 0t10 0t10 0t10 0t10 0" strokeWidth={2} />
      </g>
    ),
  },
  // Where the building happens (allegedly)
  desk: {
    viewBox: "0 0 100 75",
    label: "stickman hard at work while the real photo loads",
    art: (
      <g {...stroke}>
        {/* desk + monitor */}
        <path d="M46 46h42 M52 46v20 M82 46v20" />
        <rect x={59} y={29} width={19} height={13} rx={1} />
        <path d="M68.5 42v4" />
        {/* stickman, typing away */}
        <circle cx={29} cy={23} r={7} />
        <path d="M26.5 25q2.5 2.5 5 0" strokeWidth={2} />
        <path d="M29 30v18 M29 37l23 7 M29 48l12 4v14" />
        {/* chair */}
        <path d="M21 48h16 M29 48v18" />
      </g>
    ),
  },
  // Professional portrait, sort of
  portrait: {
    viewBox: "0 0 100 125",
    label: "stickman posing while the real photo loads",
    art: (
      <g {...stroke}>
        <circle cx={50} cy={38} r={9} />
        <path d="M46 41q4 4 8 0" strokeWidth={2} />
        {/* hand on hip, peace sign up */}
        <path d="M50 47v33 M50 56l-12 8l8 6 M50 56l14 -10l-2 -12 M62 34l-4 -8 M62 34l4 -8" />
        <path d="M50 80l-10 22 M50 80l10 22" />
        {/* camera flash */}
        <path d="M78 24v-6 M78 30v6 M72 27h-5 M84 27h5" strokeWidth={2} />
      </g>
    ),
  },
}

export function PhotoSketch({ variant }: { variant: Variant }) {
  const scene = scenes[variant]
  return (
    <svg
      viewBox={scene.viewBox}
      preserveAspectRatio="xMidYMid meet"
      className="sketch-pulse pointer-events-none absolute inset-0 h-full w-full p-[12%] text-ink/25"
      role="img"
      aria-label={scene.label}
    >
      {scene.art}
    </svg>
  )
}
