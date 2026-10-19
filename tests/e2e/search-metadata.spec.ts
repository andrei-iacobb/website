import { expect, test } from "@playwright/test"

test("homepage is indexable and uses the portrait instead of the generated text card", async ({ request }) => {
  const response = await request.get("/")
  expect(response.ok()).toBe(true)
  const html = await response.text()

  expect(html).toContain('<meta name="robots" content="index, follow"')
  expect(html).not.toContain('<meta name="robots" content="noindex')
  expect(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]).toMatch(/^https:\/\/andrei\.iacob\.co\.uk\/?$/)
  expect([...html.matchAll(/<meta property="og:image" content="([^"]+)"/g)].map((match) => match[1])).toEqual([
    "https://andrei.iacob.co.uk/IMG_3962.jpeg",
  ])
  expect(html).toContain('<meta name="twitter:image" content="https://andrei.iacob.co.uk/IMG_3962.jpeg"')
  expect(html).toContain('"primaryImageOfPage":"https://andrei.iacob.co.uk/IMG_3962.jpeg"')

  const portrait = await request.get("/IMG_3962.jpeg")
  expect(portrait.ok()).toBe(true)
  expect(portrait.headers()["content-type"]).toContain("image/jpeg")
})

test("About stays accessible but is excluded from search and the sitemap", async ({ request }) => {
  const response = await request.get("/about")
  expect(response.ok()).toBe(true)
  const html = await response.text()
  expect(html).toContain('<meta name="robots" content="noindex, follow"')
  expect(html).not.toContain('<meta name="googlebot" content="index')

  const sitemap = await request.get("/sitemap.xml")
  expect(sitemap.ok()).toBe(true)
  const xml = await sitemap.text()
  expect(xml).toContain("<loc>https://andrei.iacob.co.uk</loc>")
  expect(xml).not.toContain("https://andrei.iacob.co.uk/about")

  const robots = await request.get("/robots.txt")
  expect(robots.ok()).toBe(true)
  expect(await robots.text()).not.toContain("Disallow: /about")
})
