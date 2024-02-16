describe("Login ", () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it("shows a register form", () => {
    cy.get("#registerForm").should("be.visible");
  });

  it("shows a login form when the login button is pressed", () => {
    cy.showLoginForm();
  });

  it("allows a user with valid credentials to login", () => {
    cy.showLoginForm();

    cy.loginWithValidCredentials();

    cy.isLoggedIn();
  });

  it("allows a valid user to log out", () => {
    cy.showLoginForm();

    cy.loginWithValidCredentials();

    cy.isLoggedIn();

    cy.logout();

    cy.isLoggedOut();
  });

  it("the user can not log in with invalid password and an error message is displayed", () => {
    cy.showLoginForm();

    cy.loginWithInvalidCredentials();

    cy.showErrorMessage();
  });
});
