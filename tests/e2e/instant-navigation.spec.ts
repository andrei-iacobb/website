import { expect, test } from "@playwright/test"
import { instant } from "@next/playwright"

const baseURL = process.env.INSTANT_BASE_URL ?? "http://127.0.0.1:3102"
const routes = [
  { path: "/", marker: "page-heading-home", heading: "Andrei Iacob" },
  { path: "/about", marker: "page-heading-about", heading: "About Andrei Iacob" },
  { path: "/homelab", marker: "page-heading-homelab", heading: "I host what I build." },
]

for (const route of routes) {
  test(`hard navigation serves the ${route.path} shell`, async ({ page }) => {
    await instant(
      page,
      async () => {
        await page.goto(route.path)
        await expect(page.getByTestId(route.marker)).toHaveText(route.heading)
      },
      { baseURL },
    )
  })
}

const softNavigations = [
  { from: "/about", trigger: "nav-home", to: "/", marker: "page-heading-home", heading: "Andrei Iacob" },
  { from: "/", trigger: "nav-about", to: "/about", marker: "page-heading-about", heading: "About Andrei Iacob" },
  { from: "/", trigger: "nav-homelab", to: "/homelab", marker: "page-heading-homelab", heading: "I host what I build." },
]

for (const navigation of softNavigations) {
  test(`soft navigation commits ${navigation.to} from ${navigation.from}`, async ({ page }) => {
    await page.goto(navigation.from)
    const trigger = page.getByTestId(navigation.trigger)
    await expect(trigger).toBeVisible()

    await instant(page, async () => {
      await trigger.click()
      await expect(page.getByTestId(navigation.marker)).toHaveText(navigation.heading)
    })

    await expect(page).toHaveURL(new URL(navigation.to, baseURL).toString())
  })
}
