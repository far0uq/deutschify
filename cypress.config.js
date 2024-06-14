const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    VITE_REACT_APP_API_SERVER_URL: 'http://127.0.0.1:5000/api',
  },
  
  e2e: {
    baseUrl: "http://localhost:5173/",

    // setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
);
