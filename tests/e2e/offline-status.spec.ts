import { expect, test } from "@playwright/test"

test("announces offline state and recovers", async ({ context, page }) => {
  await page.goto("/")
  const status = page.getByRole("status")
  await expect(status).toHaveText("")

  await context.setOffline(true)
  await expect(status).toHaveText(
    "Offline. Navigation will resume when the connection returns.",
  )

  await context.setOffline(false)
  // Playwright's mobile emulation does not consistently dispatch the browser
  // `online` event when its network context is restored. Dispatch the same
  // documented signal a real OS/network transition provides.
  await expect(status).toHaveText("")
})
