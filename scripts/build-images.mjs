// Pre-encodes every local photo the source code references into AVIF and WebP at fixed widths.
// The server then only serves finished, content-hashed static files that Cloudflare can cache,
// instead of resizing on the first request and losing that work on every restart.
//
// Usage: node scripts/build-images.mjs <manifest.json> <scan dir>...
import { createHash } from "node:crypto";
import { access, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [320, 480, 640, 828, 1080, 1320, 1920];
const ENCODERS = {
  avif: (image) => image.avif({ quality: 55, effort: 4 }),
  webp: (image) => image.webp({ quality: 75, effort: 5 }),
};
const ENCODER_FINGERPRINT = JSON.stringify({
  v: 1,
  vips: sharp.versions.vips,
  encoders: Object.values(ENCODERS).map(String),
});
const SOURCE_PATTERN = /["'`](\/(?:[\w.-]+\/)*[\w.-]+\.(?:jpe?g|png))["'`]/gi;
const OUTPUT_PREFIX = "/_img";

const root = process.cwd();
const publicDir = path.join(root, "public");
const outDir = path.join(publicDir, OUTPUT_PREFIX);
const [manifestArg, ...scanArgs] = process.argv.slice(2);
if (!manifestArg || scanArgs.length === 0) {
  throw new Error("Usage: node scripts/build-images.mjs <manifest.json> <scan dir>...");
}

async function listSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && /\.(tsx?|mjs)$/.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

async function referencedImages() {
  const files = (
    await Promise.all(scanArgs.map((dir) => listSourceFiles(path.join(root, dir))))
  ).flat();
  const texts = await Promise.all(files.map((file) => readFile(file, "utf8")));
  const found = new Set(
    texts.flatMap((text) => [...text.matchAll(SOURCE_PATTERN)].map((m) => m[1])),
  );
  const images = await Promise.all(
    [...found].toSorted().map(async (src) => {
      const file = path.join(publicDir, src);
      if (!file.startsWith(publicDir + path.sep)) return null;
      // A matching string that is not a public file (for example a route) is not ours to encode.
      const bytes = await readFile(file).catch(() => null);
      return bytes && { src, bytes };
    }),
  );
  return images.filter(Boolean);
}

async function encode({ src, bytes }, written) {
  const meta = await sharp(bytes).metadata();
  const rotated = (meta.orientation ?? 1) >= 5;
  const width = rotated ? meta.height : meta.width;
  const height = rotated ? meta.width : meta.height;
  // Settings and libvips version are hashed too, so a changed encoder never reuses an immutable URL.
  const hash = createHash("sha256")
    .update(bytes)
    .update(ENCODER_FINGERPRINT)
    .digest("hex")
    .slice(0, 10);
  const base = path.basename(src).replace(/\.[^.]+$/, "");
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), Math.min(width, WIDTHS.at(-1))])];

  const entry = { width, height };
  const jobs = [];
  for (const [format, encoder] of Object.entries(ENCODERS)) {
    const candidates = widths.map((w) => ({ name: `${base}-${hash}-${w}.${format}`, w }));
    for (const { name, w } of candidates) {
      written.add(name);
      const target = path.join(outDir, name);
      jobs.push(
        access(target).catch(() =>
          encoder(sharp(bytes).rotate().resize({ width: w })).toFile(target),
        ),
      );
    }
    entry[format] = candidates.map(({ name, w }) => `${OUTPUT_PREFIX}/${name} ${w}w`).join(", ");
    if (format === "webp") entry.fallback = `${OUTPUT_PREFIX}/${candidates.at(-1).name}`;
  }
  await Promise.all(jobs);
  return entry;
}

const images = await referencedImages();
await mkdir(outDir, { recursive: true });
const written = new Set();
const manifest = {};
await Promise.all(
  images.map(async (image) => {
    manifest[image.src] = await encode(image, written);
  }),
);

const stale = (await readdir(outDir)).filter((name) => !written.has(name));
await Promise.all(stale.map((name) => rm(path.join(outDir, name))));

const sorted = Object.fromEntries(
  Object.entries(manifest).toSorted(([a], [b]) => a.localeCompare(b)),
);
const manifestPath = path.join(root, manifestArg);
await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(
  `build-images: ${images.length} images, ${written.size} files in public${OUTPUT_PREFIX}`,
);
