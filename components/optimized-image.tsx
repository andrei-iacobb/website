import type { ImgHTMLAttributes } from "react"
import imageManifest from "@/generated/image-manifest.json"

type PrebuiltImage = { avif: string; webp: string; fallback: string }
const images: Record<string, PrebuiltImage | undefined> = imageManifest

type OptimizedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "height" | "src" | "srcSet" | "width"
> & {
  alt: string
  src: string
  width: number
  height: number
}

export function OptimizedImage({
  alt,
  src,
  width,
  height,
  sizes,
  loading = "lazy",
  decoding = "async",
  ...props
}: OptimizedImageProps) {
  const image = images[src]
  if (!image) throw new Error(`${src} is missing from the image manifest; run pnpm images`)

  return (
    <picture>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        {...props}
        alt={alt}
        src={image.fallback}
        sizes={sizes}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  )
}
