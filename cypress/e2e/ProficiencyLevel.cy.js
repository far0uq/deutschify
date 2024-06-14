// proficiencyPanel.spec.js

describe("ProficiencyPanel Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Test Case 1: Verify that all levels are presented in the UI", () => {
    cy.get(".proficiency-buttons").should("have.length", 3);
    cy.contains("Beginner").should("be.visible");
    cy.contains("Intermediate").should("be.visible");
    cy.contains("Advanced").should("be.visible");
  });

  it("Test Case 2: Verify that the 'Get Started' button is clickable", () => {
    cy.get(".proficiency-level-container").contains("Beginner").click();
    cy.contains("Get Started").should("be.visible").click();
  });
});
