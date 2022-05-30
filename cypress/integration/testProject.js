/// <reference types="cypress" />



    before(function(){
      cy.fixture('data').then((data) => {
          this.data = data
      })
    })
  
const sizes = [[576, 960], [1920, 1080]]  

describe('knowde test project', function () {
  
  sizes.forEach((size) => {
    
    context('viewport '+(size) ,()=>{
    
      beforeEach(function(){
      cy.visit('/')
      cy.viewport(size[0],size[1])
    })
    
    it('TC01: Login form validation',() =>  {
      cy.get('input#login-button').click()
      cy.get('.error-message-container').should('contain','Epic sadface: Username is required')
      cy.get('input#user-name').type('user')
      cy.get('input#user-name').should('have.value', 'user')
      })
   
    it('TC02: Success Login',function()  {
      cy.login(this.data.locked_user,this.data.password)
      cy.get('.error-message-container').should('contain','Epic sadface: Sorry, this user has been locked out.')
      cy.login('wrongName',this.data.password)
      cy.get('.error-message-container').should('contain','Epic sadface: Username and password do not match any user in this service')
      cy.success_login()
    })
    it('TC03: Success Order',function()  {
      cy.success_login()
      cy.get('.inventory_item').contains('Sauce Labs Backpack').parentsUntil('.inventory_item').within(()=>{
        cy.get('.inventory_item_price').invoke('text').as('item_price')
        cy.get('.btn_inventory').click()
        cy.get('.btn_inventory').should('have.text','Remove' )
      })
      //using only button id's
      //cy.get('button#add-to-cart-sauce-labs-backpack').click()
      //cy.get('button#remove-sauce-labs-backpack').should('have.text','Remove' )
      cy.get('.shopping_cart_badge').should('have.text',1).click()
      cy.get('.cart_quantity').should('have.text',1)
      cy.get('.inventory_item_price').invoke('text').then((price) => {
        expect(price).equal(this.item_price)
      })
      cy.get('button#checkout').click()
      cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')
      cy.get('form').within(()=>{
        expect('input#first-name').to.exist
        expect('input#last-name').to.exist
        expect('input#postal-code').to.exist
      })
      cy.get('input#first-name').type('first')
      cy.get('input#last-name').type('last')
      cy.get('input#postal-code').type('000')
      cy.get('input#continue').click()
      cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html')
      cy.get('button#finish').click()
      cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html')
      cy.get('h2.complete-header').should('have.text','THANK YOU FOR YOUR ORDER')
      })
    })
  })
})