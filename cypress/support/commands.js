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

Cypress.Commands.add("SubmitFormDetails",()=>{
    cy.get('#country').type('Ind')
        // Cypress.config('defaultCommandTimeout',8000)
        cy.wait(1000)
        cy.get('.suggestions ul li a').each($el => {
            if ($el.text() === 'India') {
                cy.wrap($el).click()
            }
        })
    cy.get(".checkbox-primary input").check({ force: true })
    cy.get("input[type='submit']").click()
})