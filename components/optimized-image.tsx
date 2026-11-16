/* eslint-disable @next/next/no-img-element -- Uses Next's optimizer without its client image module. */
import type { ImgHTMLAttributes } from "react"

const OPTIMIZER_WIDTHS = [
  32, 48, 64, 96, 128, 256, 320, 384, 432, 484,
  640, 750, 828, 1080, 1200, 1920, 2048, 3840,
]

type OptimizedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "height" | "src" | "srcSet" | "width"
> & {
  alt: string
  src: string
  width: number
  height: number
  quality?: 75
}

function optimizerUrl(src: string, width: number, quality: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

export function OptimizedImage({
  alt,
  src,
  width,
  height,
  quality = 75,
  loading = "lazy",
  decoding = "async",
  ...props
}: OptimizedImageProps) {
  const widths = OPTIMIZER_WIDTHS.filter((candidate) => candidate <= width)
  const fallbackWidth = widths[widths.length - 1] ?? OPTIMIZER_WIDTHS[0]
  const srcSet = widths
    .map((candidate) => `${optimizerUrl(src, candidate, quality)} ${candidate}w`)
    .join(", ")

  // The optimizer still negotiates AVIF/WebP, but no image client module is
  // needed for these static local files.
  return (
    <img
      {...props}
      alt={alt}
      src={optimizerUrl(src, fallbackWidth, quality)}
      srcSet={srcSet}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
    />
  )
}
