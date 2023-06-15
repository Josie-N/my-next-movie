
describe('Movie list (switch)', () => {
  beforeEach(() => {
    // Set to desktop viewport
    cy.viewport(1280, 695);
    cy.visit('http://localhost:3000/');
  });

  it('should become empty when a user clicks on any item in the watchlist menu that has 0 movies', () => {
    // Check that no movies have been added to the first watchlist menu item
    // why 'aria-labelledby': selector is more resilient to changes than a text selector (ex: 'Added', 'Removed')
    cy.get('[aria-labelledby="my menu watchlist"]').should('exist');
    cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("0");

    // Click on the first item of the watchlist menu
    cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).click();

    // Assert that the selected watchlist is empty and has no movie cards available
    cy.get("div").contains(/Much wow, such empty/i).should('be.visible');
    cy.get('[data-cy="movie_card_test"]').should('not.exist');
  });

  it('should display a watchlist when a user clicks on an item in the watchlist menu that has at least 1 movie', () => {
    // Hover over second movie card, click 'ADD' button
    cy.get('[data-cy="movie_card_test"]').eq(2).trigger('mouseover');
    cy.get("button").contains(/add/i).click();

    // Watchlist menu link now records that 1 movie has been added
    cy.get('[aria-labelledby="my menu watchlist"]').should('exist');
    cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("1");

    // Click on the first item of the watchlist menu
    cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).click();

    // Assert that added watchlist is NOT empty and has at least 1 movie card available
    cy.get('[data-cy="movie_card_test"]').should('be.visible');
    cy.get("div").contains(/Much wow, such empty/i).should('not.exist');
  });
})

export {}
