import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";

const BASE_URL = "http://localhost:3000";

Given("Tengo el siguiente api: {string}", function (givenEndpoint) {
	this.endpoint = givenEndpoint;
});

When("Se busque por el usuario con id: {string}", function (givenId) {
	this.id = givenId;
});

Then(
	"El estado de la respuesta del api debe ser: {string}",
	async function (expectedStatusCode) {
		const response = await fetch(`${BASE_URL}${this.endpoint}${this.id}`);
		assert.strictEqual(response.status, parseInt(expectedStatusCode));
	}
);
