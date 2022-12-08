import * as cypress from 'cypress';

describe('ComponentName.cy.ts', (): void => {
  it('playground', (): void => {
    cy.get('#email');
    cy.get('#password');
    cy.get('[type="submit"]').click();
    cy.get('[type="button"]').click();
  });
});

export {};
