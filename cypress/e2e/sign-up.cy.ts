describe('Sign Up', () => {
  it('passes', () => {
    cy.visit('/')
    cy.screenshot()

    cy.get('[data-cy="sign-up-button"]').click()

    // sign-up
    cy.url().should('include', '/sign-up')
    cy.contains('Create new account')
    cy.get('[data-cy="username-input"]').type('testuser')
    cy.get('[data-cy="create-nostr-account-button"]').click()

    // seed-phrase
    cy.contains('Write down your seed phrase somewhere safe')
    cy.contains('1')
    cy.contains('12')
    cy.get('[data-cy="seed-phrase-continue-button"').click()

    // personal-details
    cy.url().should('include', '/personal-details')
    cy.contains('Personal details')

    cy.get('[data-cy="first-name-input"]').type('Test')
    cy.get('[data-cy="last-name-input"]').type('User')
    cy.get('[data-cy="personal-details-continue-button"]').click()

    // profile
    cy.url().should('include', '/profile')
  })
})
