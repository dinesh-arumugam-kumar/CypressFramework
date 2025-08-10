///<reference types="cypress"/>
///<reference types="cypress-iframe"/>
import 'cypress-iframe';

describe('Handling Child Window, Frames & Calendar Suite', () => {
    before(function () { // it ran once before all tests
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })

    it("End to End Test", function () {
        cy.visit("https://rahulshettyacademy.com/loginpagePractise/")
        cy.get('#username').type(this.data.username)
        cy.get('#password').type(this.data.password)
        cy.get('#terms').check()
        cy.get('#signInBtn').click()
        cy.get('.navbar-dark a').eq(0).should('contain', 'ProtoCommerce')
        cy.contains('Shop Name').should('be.visible')
        cy.get('app-card').should('have.length', 4)
        // cy.get('.card-body').each(($el,index,$list)=>{
        //     if(cy.wrap($el).contains(productName)){
        //         cy.get('.card-footer button').eq(index).click()
        //     }
        // })
        cy.get('app-card').filter(`:contains("${this.data.productName}")`).then($el => {
            cy.wrap($el).should('have.length', 1)
            cy.wrap($el).contains('button', 'Add').click()
        })
        cy.get('app-card').eq(1).contains('button', 'Add').click()
        cy.contains('a', 'Checkout').click()
        let sum = 0
        cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
            const amount = Number($el.text().split(" ")[1].trim())
            sum = sum + amount
        }).then(() => {
            cy.get('tr td:nth-child(5) strong').then(tot => {
                const total = Number(tot.text().split(" ")[1].trim())
                cy.log("Sum " + sum + " Total " + total)
                expect(sum).to.be.lessThan(200000)
                expect(sum).to.be.equal(total)
            })
        })
        cy.contains('button', 'Checkout').click()
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
        cy.get(".alert-success").should('contain', 'Success')
    })
})