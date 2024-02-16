// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("visitHome", () => {
  cy.visit("/");
  cy.wait(500);
});

Cypress.Commands.add("showLoginForm", () => {
  cy.get("#registerForm").find("button[data-auth=login]").click();
  cy.get("#loginForm").should("be.visible");
  cy.wait(1000);
});

Cypress.Commands.add("login", (email, password) => {
  cy.get("#loginForm").find("input[name=email]").type(email);
  cy.get("#loginForm").find("input[name=password]").type(password);
  cy.get("#loginForm").find("button[type=submit]").click();
  cy.wait(1500);
});

Cypress.Commands.add("loginWithTestUser", () => {
  cy.login(Cypress.env("email"), Cypress.env("password"));
});

Cypress.Commands.add("isLoggedIn", () => {
  cy.window().then((win) => {
    cy.expect(win.localStorage.getItem("token")).to.be.a("string");
  });
});

Cypress.Commands.add("logout", () => {
  cy.get("button[data-auth=logout]").click();
  cy.wait(500);
});

Cypress.Commands.add("isLoggedOut", () => {
  cy.window().then((win) => {
    expect(win.localStorage.getItem("token")).to.be.null;

    cy.location().should((location) => {
      expect(location.pathname).to.equal("/");
    });
  });
});

Cypress.Commands.add("loginWithInvalidCredentials", () => {
  cy.login(
    cy.get("#loginForm").find("input[name=email]").type("invalidUser@test.no"),
  );
  cy.get("#loginForm").find("input[name=password]").type("invalidPassword1234");
  cy.get("#loginForm").find("button[type=submit]").click();
});

Cypress.Commands.add("showErrorMessage", () => {
  cy.on("window:alert", (message) => {
    expect(message).to.equal(
      "Either your username was not found or your password is incorrect",
    );
  });
});
