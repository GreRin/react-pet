describe('empty spec', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    // cy.exec('npm run db:reset && npm run db:seed');
    // seed a user in the DB that we can control from our tests
    // assuming it generates a random password for us
    // cy.request('POST', '/api/login', { email: 'rigor1988@gmail.com', password: 'iLmlcGqCD0' })
    //   .its('body')
    //   .as('currentUser');
  });

  context('Form submittion', () => {
    it.only('Visit auth form', () => {
      cy.visit('/');

      cy.focused().should('have.id', 'email');
      cy.get('#email').type('rigor1988@gmail.com').should('have.value', 'rigor1988@gmail.com');
      cy.get('#password').type('iLmlcGqCD0').should('have.value', 'iLmlcGqCD0');
      cy.get('[type="submit"]').click();

      cy.request('POST', '/api/login', { email: 'rigor1988@gmail.com', password: 'iLmlcGqCD0' })
        .its('body')
        .as('accessToken');
      cy.getCookie('accessToken').should('exist');
      cy.url().should('include', '/');

      cy.request('GET', 'https://api.github.com/users/angular/repos');
      cy.request('GET', 'https://api.github.com/search/users?q=react&per_page=10');
    });

    it.only('Shows an error message on a failed submission', () => {
      cy.server();
      cy.route({
        url: 'https://api.github.com/users/angular/repos',
        method: 'GET',
        status: 500,
        response: {},
      });
    });
  });
});

export {};
