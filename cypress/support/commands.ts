/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


// Caution:
// If you need other/ more custom commands, create new ones instead of modifying the pre-existing ones.

// Why?
// To maintain backward compatibility and avoid breaking existing tests.
// Modifying pre-existing commands will lead to issues with older tests that rely on those commands.

// TL;DR: If you modify pre-existing commands, you will break existing tests.

// ---------------------------- //

// Default scenario (for new users)
// Recommended list is populated, watchlist has 0 movies
Cypress.Commands.add("apiStubWatchlistEmpty", () => {
  cy.intercept("GET", "/api/movies*list=recommended*", {fixture: "movies-recommended-list/movies-recommended-list-5.json"}).as("moviesStubTest");
  cy.intercept("GET", "/api/movies*list=added*", {fixture: "movies-added-list/movies-added-list-0.json"}).as("moviesAddedStubTest");
  cy.intercept("GET", "/api/user*", {fixture: "user-watchlist-activity/watchlist-counts-added-0-removed-0.json"}).as("usernameStubTest");
});

// Recommended list is populated, watchlist has 1 movie added
Cypress.Commands.add("apiStubWatchlistOneItem", () => {
  cy.intercept("GET", "/api/movies*list=recommended*", {fixture: "movies-recommended-list/movies-recommended-list-5.json"}).as("moviesStubTest");
  cy.intercept("GET", "/api/movies*list=added*", {fixture: "movies-added-list/movies-added-list-1.json"}).as("moviesAddedStubTest");
  cy.intercept("GET", "/api/user*", {fixture: "user-watchlist-activity/watchlist-counts-added-1-removed-0.json"}).as("usernameStubTest");
});

// ---------------------------- //

// Homepage (recommended list) is selected
Cypress.Commands.add("checkHomepageIsSelected", () => {
  cy.get('[data-testid="cy-heading-watchlist"]').contains(/Browse all movies available/i).should('exist');
  cy.get('[data-testid="cy-heading-watchlist"]').contains(/My added watchlist/i).should('not.exist');
  cy.get('[data-testid="cy-heading-watchlist"]').contains(/My removed watchlist/i).should('not.exist');
});

// Added watchlist is selected
Cypress.Commands.add("checkAddedListIsSelected", () => {
  cy.get('[data-testid="cy-heading-watchlist"]').contains(/My added watchlist/i).should('exist');
  cy.get('[data-testid="cy-heading-watchlist"]').contains(/Browse all movies available/i).should('not.exist');
  cy.get('[data-testid="cy-heading-watchlist"]').contains(/My removed watchlist/i).should('not.exist');
});

// ANY list is selected, doesn't matter which one in particular
Cypress.Commands.add("checkListIsSelected", () => {
  cy.get('[data-testid="cy-heading-empty-list"]').should('not.exist');
  cy.get('[data-testid="cy-movie-card"]').should('be.visible');
  cy.get('[data-testid="cy-movie-card"]').should('have.length.greaterThan', 0);
});

// Empty list is selected
Cypress.Commands.add("checkWatchlistIsEmpty", () => {
  cy.get('[data-testid="cy-heading-empty-list"]').contains(/Much wow, such empty!/i).should('be.visible');
  cy.get('[data-testid="cy-movie-card"]').should('not.exist');
});

export {};
