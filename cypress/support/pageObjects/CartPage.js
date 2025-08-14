import ConfirmationPage from '../../support/pageObjects/ConfirmationPage';
class CartPage{

    validateCart(){
        let sum = 0
        return cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
            const amount = Number($el.text().split(" ")[1].trim())
            sum = sum + amount
        }).then(() => {
            cy.get('tr td:nth-child(5) strong').then($tot => {
                const total = Number($tot.text().split(" ")[1].trim())
                cy.log("Sum " + sum + " Total " + total)
                return cy.wrap({sum,total});
            })
        })
    }

    checkout(){
        cy.contains('button', 'Checkout').click()
        return new ConfirmationPage()
    }
}
export default CartPage;