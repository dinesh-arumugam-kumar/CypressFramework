class ConfirmationPage{

    submitFormDetails(){
        cy.SubmitFormDetails()
    }
    getAlertMessage(){
        return cy.get(".alert-success")
    }
}
export default ConfirmationPage;