describe('Input form', () => {
  it('focuses input on load', () => {
    cy.visit('/');
    cy.focused().should('have.id', 'email');
  });
});

export {};
