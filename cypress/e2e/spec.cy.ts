import { type } from '@testing-library/user-event/dist/type';
import { Simulate } from 'react-dom/test-utils';
import submit = Simulate.submit;

describe('empty spec', () => {
  // it('passes', () => {
  //   cy.visit('https://example.cypress.io');
  // });
  it('Should open localhost', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#email');
    cy.get('#password');
    cy.get('[type="submit"]').click();
    cy.get('[type="button"]').click();
  });
});

export {};
