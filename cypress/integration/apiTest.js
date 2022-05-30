/// <reference types="cypress" />
    
  describe('TC05: Cat fact API check', () => {
    
    it('Get random fact', () => {
        cy.request({
            method: 'GET',
            url : 'https://catfact.ninja/fact',
        }).then((resp)=>{
            cy.log(resp)
            expect(resp.status).to.equal(200)
            expect(resp.body.fact).to.be.a('string')
            expect(resp.body.length).to.be.a('number')
            cy.log('The fact is: '+resp.body.fact)
            cy.log('The length is: '+resp.body.length)
        })  
    })
    
})