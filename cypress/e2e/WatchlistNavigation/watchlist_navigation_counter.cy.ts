// TO DO:
//
// - check that Added(0) does not equal Added(3) if you click on the same card 3 times in a row
// - (done) check that Added(1) + adding one more movie card will always equal Added(2)
//

describe('Watchlist navigation', () => {
  beforeEach(() => {
    cy.viewport(1280, 695);
    cy.apiStubWatchlistOneItem();
    cy.visit('http://localhost:3000/');
  });

  it('should count 1 + 1 = 2', () => {
    cy.checkHomepageIsSelected();

    cy.get('[aria-labelledby="my menu watchlist"]').should('exist');
    cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("1");

    // Hover over second movie card, click 'ADD' button
    cy.get('[data-testid="cy-movie-card"]').eq(2).trigger('mouseover');
    cy.get("button").contains(/Add/i).click();

    cy.intercept("GET", "/api/user*", {fixture: "user-watchlist-activity/watchlist-counts-added-2-removed-0.json"}).as("usernameTest");
    cy.wait("@usernameTest");

    cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("2");
  });
});

export {};