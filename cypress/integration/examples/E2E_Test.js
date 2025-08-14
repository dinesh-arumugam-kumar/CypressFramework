///<reference types="cypress"/>
///<reference types="cypress-iframe"/>
import 'cypress-iframe';
import HomePage from '../../support/pageObjects/HomePage';

describe('Handling Child Window, Frames & Calendar Suite', () => {
    before(function () { // it ran once before all tests
        cy.fixture('example').then(function (data) {
            this.data = data
        })
    })

    it("End to End Test", function () {
        const homePage = new HomePage()
        // const productPage = new ProductPage()
        homePage.goTo("https://rahulshettyacademy.com/loginpagePractise/")
        const ProductPage = homePage.login(this.data.username, this.data.password)

        ProductPage.pageValidation()
        ProductPage.getCartCount().should('have.length', 4)
        ProductPage.selectProduct(this.data.productName)

        // cy.get('.card-body').each(($el,index,$list)=>{
        //     if(cy.wrap($el).contains(productName)){
        //         cy.get('.card-footer button').eq(index).click()
        //     }
        // })
        ProductPage.selectFirstProduct()
        const CartPage = ProductPage.goToCart()
        CartPage.validateCart().then(function ({sum, total}) {
            expect(sum).to.be.lessThan(200000)
            expect(sum).to.be.equal(total)
        })

        const ConfirmationPage = CartPage.checkout()
        ConfirmationPage.submitFormDetails()
        ConfirmationPage.getAlertMessage().should('contain','Success')

    })
})