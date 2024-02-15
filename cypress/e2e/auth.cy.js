describe("Login ", () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it("shows a register form", () => {
    cy.get("#registerForm").should("be.visible");
  });

  it("shows a login form when the login button is pressed", () => {
    cy.get("#registerForm").find("button[data-auth=login]").click();
    cy.get("#loginForm").should("be.visible");
  });

  it("allows a valid and registered user to login", () => {
    cy.get;
  });

  it("allows a valid user to log out", () => {
    // logout functionality
  });

  it("the user can not log in with invalid credentials and an error message is displayer", () => {
    // error functionality
  });
});
