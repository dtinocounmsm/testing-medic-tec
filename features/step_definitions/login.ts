import assert from "assert";
import {
  AfterAll,
  Before,
  BeforeAll,
  Given,
  When,
  Then,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";

let browser: Browser;
let context: BrowserContext;

const baseUrl = "http://localhost:5173";

export const fixture = {
  page: undefined as Page,
};

BeforeAll(async function () {
  browser = await chromium.launch();
});

Before({ tags: "not @auth" }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  const page = await context.newPage();
  fixture.page = page;
});

AfterAll(async function () {
  await browser.close();
});

Given(
  "Un usuario que desea iniciar sesión accede a ruta {string}",
  async (givenRoute: string) => {
    await fixture.page.goto(baseUrl + givenRoute);
  }
);

Given(
  "Ingresa el usuario: {string} y la contraseña: {string}",
  async (givenEmail: string, givenPassword: string) => {
    await fixture.page.getByTestId("email").fill(givenEmail);
    await fixture.page.getByTestId("password").fill(givenPassword);
  }
);

Given("Ingresa el usuario: {string}", async (givenEmail: string) => {
  await fixture.page.getByTestId("email").fill(givenEmail);
});

Given("Ingresa la contraseña {string}", async (givenPassword: string) => {
  await fixture.page.getByTestId("password").fill(givenPassword);
});

When("Haga clic en el botón {string}", async (givenButtonName) => {
  await fixture.page.getByText(givenButtonName).click();
});

Then(
  "El usuario debe ser redirigido a la ruta {string}",
  async (expectedPath: string) => {
    const expectedUrl = baseUrl + expectedPath;
    await fixture.page.waitForURL(expectedUrl);
    const url = fixture.page.url();
    await fixture.page.screenshot({
      path: `test-results/screenshots/login_success_${new Date().getTime()}.png`,
    });
    assert.strictEqual(url, expectedUrl);
  }
);

Then(
  "El usuario debe permanecer la misma ruta {string}",
  async (expectedPath: string) => {
    const expectedUrl = baseUrl + expectedPath;
    await fixture.page.waitForURL(expectedUrl);
    const url = fixture.page.url();
    assert.strictEqual(url, expectedUrl);
  }
);

Then(
  "Debería ver los mensajes {string} y {string} debajo de su correspondiente input",
  async (expectedEmailMessage: string, expectedPasswordMessage) => {
    const actualEmailMessage = await fixture.page
      .getByTestId("error-email")
      .textContent();
    const actualPasswordMessage = await fixture.page
      .getByTestId("error-password")
      .textContent();
    await fixture.page.screenshot({
      path: `test-results/screenshots/login_required_email_and_password_${new Date().getTime()}.png`,
    });
    assert.strictEqual(actualEmailMessage, expectedEmailMessage);
    assert.strictEqual(actualPasswordMessage, expectedPasswordMessage);
  }
);

Then(
  "Debería ver el mensaje {string} debajo del campo de correo",
  async (expectedMessage: string) => {
    const message = await fixture.page.getByTestId("error-email").textContent();
    await fixture.page.screenshot({
      path: `test-results/screenshots/login_required_email_${new Date().getTime()}.png`,
    });
    assert.strictEqual(message, expectedMessage);
  }
);

Then(
  "Debería ver el mensaje {string} debajo del campo de contraseña",
  async (expectedMessage: string) => {
    const message = await fixture.page
      .getByTestId("error-password")
      .textContent();
    await fixture.page.screenshot({
      path: `test-results/screenshots/login_required_password_${new Date().getTime()}.png`,
    });
    assert.strictEqual(message, expectedMessage);
  }
);

Then(
  "Debería ver el mensaje de error {string}",
  async (expectedMessage: string) => {
    const message = await fixture.page
      .getByTestId("error-message")
      .textContent();
    await fixture.page.screenshot({
      path: `test-results/screenshots/login_error_${new Date().getTime()}.png`,
    });
    assert.strictEqual(message, expectedMessage);
  }
);
