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
Cypress.Commands.add('login',function(user, password) { 
    cy.get('input#user-name').clear().type(user)
    cy.get('input#password').clear().type(password)
    cy.get('form').submit()
   
})
Cypress.Commands.add('success_login',function() { 
    cy.get('input#user-name').clear().type(this.data.standard_user)
    cy.get('input#password').clear().type(this.data.password)
    cy.get('form').submit()
    cy.url().should('eq', this.data.landing_url)
      cy.getCookie('session-username').should('have.property', 'value', 'standard_user') //chceking cookies since session_storage is not set by this app
      cy. get('.inventory_list').should('be.visible').within(()=>{
        cy.get('.inventory_item').should('have.length',6)
    })
   
})
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
