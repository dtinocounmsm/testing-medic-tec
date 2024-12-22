import { expect, test } from "@playwright/test";
import {
  randFirstName,
  randLastName,
  randEmail,
  randNumber,
} from "@ngneat/falso";

test("Happy Path - User Registration", async ({ page }) => {
  await page.goto("/login");
  await page.getByTestId("email").fill(process.env.ADMIN_EMAIL ?? "");
  await page.getByTestId("password").fill(process.env.ADMIN_PASSWORD ?? "");

  await page.getByTestId("sign-in").click();

  await page.waitForTimeout(2000);

  await page.getByTestId("users-registration").click();

  await page.getByTestId("firstName").click();
  const FIRST_NAME = randFirstName({ gender: "male" });
  await page.getByTestId("firstName").fill(FIRST_NAME);
  await page.getByTestId("firstName").press("Tab");

  const FIRST_SURNAME = randLastName();
  await page.getByTestId("firstSurname").fill(FIRST_SURNAME);
  await page.getByTestId("firstSurname").press("Tab");

  await page.getByTestId("secondSurname").fill(randLastName());
  await page.getByTestId("secondSurname").press("Tab");

  await page.getByTestId("birthdate").fill("1990-01-01");

  await page.getByTestId("email").click();
  const RAND_EMAIL = randEmail({
    provider: "yopmail.com",
    firstName: FIRST_NAME,
    lastName: FIRST_SURNAME,
  });
  await page.getByTestId("email").fill(RAND_EMAIL);
  await page.getByTestId("email").press("Tab");

  await page
    .getByTestId("mobile")
    .fill(randNumber({ min: 900_000_000, max: 999_999_999 }).toString());

  await page.getByLabel("Sexo").click();
  await page.getByLabel("Masculino").getByText("Masculino").click();

  await page.getByTestId("address").click();
  await page.getByTestId("address").fill("Avenida Falsa 123");

  await page.waitForTimeout(2000);
  await page.getByTestId("sign-up").click();
  await page.waitForTimeout(2000);

  await page.getByTestId("users-list").click();

  await page.waitForTimeout(4000);
  expect(page.getByRole("cell", { name: RAND_EMAIL })).toBeDefined();
});
