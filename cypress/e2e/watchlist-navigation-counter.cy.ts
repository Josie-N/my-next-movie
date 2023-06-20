
describe('Watchlist navigation', () => {
    beforeEach(() => {
        cy.viewport(1280, 695);
        cy.apiStubWatchlistOneItem();
        cy.visit('http://localhost:3000/');
    });

    it('should be able to count movies added to watchlist, 1 + 1 = 2', () => {
        cy.checkHomepageIsSelected();

        // Assert that the watchlist menu count is initially 1
        cy.get('[aria-labelledby="my menu watchlist"]').should('exist');
        cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("1");

        // Hover over second movie card, click 'ADD' button
        cy.get('[data-testid="cy-movie-card"]').eq(2).trigger('mouseover');
        cy.get("button").contains(/Add/i).click();

        // Update Added watchlist menu count
        cy.intercept("GET", "/api/user*", {fixture: "user-watchlist-activity/watchlist-counts-added-2-removed-0.json"}).as("usernameTest");
        cy.wait("@usernameTest");

        // Assert that the watchlist menu count is now 2, instead of 1
        cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("2");
    });
});

export {};
