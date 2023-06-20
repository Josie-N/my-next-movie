describe('Movie list', () => {
  beforeEach(() => {
    // Set to desktop viewport
    cy.viewport(1280, 695);
  });

  context('1', () => {
    it('should become empty when a user clicks on any item in the watchlist menu that has 0 movies', () => {
      cy.apiStubWatchlistEmpty();
      cy.visit('http://localhost:3000/');

      // Start from homepage (recommended list)
      cy.checkHomepageIsSelected();

      // Check that no movies have been added to the first watchlist menu item
      cy.get('[aria-labelledby="my menu watchlist"]').should('exist');
      cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("0");

      // Select the first item of the watchlist menu
      cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).click();

      // Assert that the selected watchlist is empty
      cy.checkAddedListIsSelected();
      cy.checkWatchlistIsEmpty();
    });
  });

  context('2', () => {
    beforeEach(() => {
      cy.apiStubWatchlistOneItem();
      cy.visit('http://localhost:3000/');
    });

    it('should display a watchlist when a user clicks on an item in the watchlist menu that has at least 1 movie', () => {
      // Start from homepage (recommended list)
      cy.checkHomepageIsSelected();

      // Hover over second movie card, click 'ADD' button
      cy.get('[data-testid="cy-movie-card"]').eq(2).trigger('mouseover');
      cy.get("button").contains(/Add/i).click();

      // Watchlist menu shows that 1 movie has been added
      cy.get('[aria-labelledby="my menu watchlist"]').should('exist');
      cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("1");

      // Click on the first item of the watchlist menu
      cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).click();

      // Assert that the selected watchlist is NOT empty
      cy.checkListIsSelected();
    });

    it('should redirect to homepage when clicking on topbar logo', () => {
      // Start from homepage (recommended list)
      cy.checkHomepageIsSelected();

      // Click on the first item of the watchlist menu
      cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).click();

      // User now on Added watchlist
      cy.checkAddedListIsSelected();

      // Click on topbar logo
      cy.get('img[alt="True tale of"]').should('be.visible');
      cy.get('img[alt="True tale of"]').click();

      // Redirect back to homepage (recommended list)
      cy.checkHomepageIsSelected();
    });
  });
})

export {}
