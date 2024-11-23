import test from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("https://localhost:5173/auth")
})

test.describe("Two Factor Authentication", () => {
    test("", () => {
        
    })
})