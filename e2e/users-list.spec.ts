import { test } from "@playwright/test";

test("user list", async ({ page }) => {
  await page.goto("/login");
  await page.getByTestId("email").fill("djoelplay@gmail.com");
  await page.getByTestId("password").fill("123456");
  await page.getByTestId("sign-in").click();
  await page.getByRole("cell", { name: "djoelplay@gmail.com" }).click();
});
