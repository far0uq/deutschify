
describe("User Registration", () => {
  const apiUrl = `${Cypress.env("VITE_REACT_APP_API_SERVER_URL")}/user/register`;

  it("Test Case 1: Verify that a user can successfully register", () => {
    cy.request("POST", apiUrl, {
      username: `testuser_${Date.now()}`, // Use unique username
      email: `testuser_${Date.now()}@example.com`,
      password: "password123@",
      re_password: "password123@",
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]); // 200 or 201
      // Assert the response body contains expected properties
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('username');
      expect(response.body).to.have.property('email');
    });
  });

  it("Test Case 2.1: Verify that a user cannot register with duplicate information", () => {
    const uniqueTimestamp = Date.now();
    const existingEmail = `existinguser_${uniqueTimestamp}@example.com`;

    // First, register with the new email to ensure it exists
    cy.request("POST", apiUrl, {
      username: `existinguser_${uniqueTimestamp}`,
      email: existingEmail,
      password: "password123@",
      re_password: "password123@",
    }).then(() => {
      // Attempt to register again with the same email
      cy.request({
        method: "POST",
        url: apiUrl,
        failOnStatusCode: false,
        body: {
          username: `newuser_${uniqueTimestamp}`,
          email: existingEmail, // This email already exists
          password: "password123@",
          re_password: "password123@",
        },
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 422]);
        // Assert the response body contains the expected error message
        expect(response.body).to.have.property("error", "Email already exists.");
      });
    });
  });
});


































