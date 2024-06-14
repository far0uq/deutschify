// resetPasswordPage.spec.js

describe("ResetPasswordPage Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/"); 
  });

  it("Test Case 1: Verify that the password input field is not empty", () => {
    cy.get("input[name='password']").type("validPassword");
    cy.get("input[name='password']").should("have.value", "validPassword");
  });

  it("Test Case 2: Verify that the re-enter password input field is not empty", () => {
    cy.get("input[name='re_password']").type("validPassword");
    cy.get("input[name='re_password']").should("have.value", "validPassword");
  });

});
