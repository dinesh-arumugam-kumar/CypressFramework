const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    embeddedScreenshots: true,
    reportDir: 'cypress/reports' // You can change this if you want a different folder
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement other node event listeners here if needed
    },
    specPattern: 'cypress/integration/examples/*.js',
    defaultCommandTimeout: 6000,
    env: {
      url: "https://rahulshettyacademy.com"
    }
  }
});