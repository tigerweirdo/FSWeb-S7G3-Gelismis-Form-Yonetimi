describe('Form Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000') 
    })
  
    it('isim inputunu alın ve bir isim yazın', () => {
      cy.get('#firstName').type('John').should('have.value', 'John')
    })
  
    it('email inputunu alın ve bir email adresi girin', () => {
      cy.get('#email').type('john@example.com').should('have.value', 'john@example.com')
    })
  
    it('şifre inputunu alın ve bir şifre girin', () => {
      cy.get('#password').type('mySecretPassword').should('have.value', 'mySecretPassword')
    })
  
    it('Kullanıcının kullanım koşulları kutusunu işaretlediğini kontrol edecek bir test oluşturun', () => {
      cy.get('#termsOfService').check().should('be.checked')
    })
  
    it('Kullanıcının form verilerini gönderip gönderemeyeceğini test edin', () => {
      cy.get('#firstName').type('John')
      cy.get('#lastName').type('Doe')
      cy.get('#email').type('john@example.com')
      cy.get('#password').type('mySecretPassword')
      cy.get('#role').select('user')
      cy.get('#termsOfService').check()
  
      cy.get('.submit-btn').click()
  
      
    })
  
    it('Bir input boş bırakılırsa form doğrulamasını test edin', () => {
      cy.get('#firstName').type('John')
      cy.get('#lastName').type('Doe')
      cy.get('#email').type('john@example.com')
      
      cy.get('#role').select('user')
      cy.get('#termsOfService').check()
  
      cy.get('.submit-btn').click()
  
      
      cy.get('.error').contains('Şifre alanı zorunludur.').should('be.visible')
    })
  })
  