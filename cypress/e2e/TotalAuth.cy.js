describe("TotalAuth Frontend Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display error messages for empty registration fields", () => {
    // Click the submit button for registration
    cy.get('.auth-form:nth-child(1) input[type="submit"]').click();

    // Verify error messages for each field
    cy.get(".field-error").should("have.length", 4);
  });

  it("should display error messages for empty login fields", () => {
    // Click the submit button for login
    cy.get('.auth-form:nth-child(2) input[type="submit"]').click();

    // Verify error messages for each field
    cy.get(".field-error").should("have.length", 2);
  });
});
