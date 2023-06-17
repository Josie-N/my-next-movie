// TO DO:
//
// - check that Added(0) does not equal Added(3) if you click on the same card 3 times in a row
// - check that Added(2) + adding two more movie cards will always equal Added(4)
//

describe('Watchlist Navigation', () => {
  // before(() => {
  //   // Set to desktop viewport
  //   cy.viewport(1280, 695);
  //   // Open app
  //   cy.visit('http://localhost:3000/');
  // });

  it('should show the correct amount of movies added in a watchlist menu item', () => {

    cy.viewport(1280, 695);
    // Open app
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy="movie_card_test"]').contains("Shawshank Redemption");


    // cy.get("button").contains(/add/i).click();
    // //
    // // cy.get('[aria-labelledby="my menu watchlist"]').should('exist');
    // // cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("1");
    // cy.get('[aria-labelledby="my menu watchlist"]').should('exist').then(() => {
    //   cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("1");
    // });
    //
    // cy.wait(5000);
    //
    //
    // cy.get('[data-cy="movie_card_test"]').contains("Dark Knight").trigger('mouseover');
    // cy.get("button").contains(/add/i).click({ force: true });
    //
    // // cy.get('[aria-labelledby="my menu watchlist"]').should('exist');
    // // cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("2");
    //
    //
    // cy.get('[aria-labelledby="my menu watchlist"]').should('exist').then(() => {
    //   cy.get('[aria-labelledby="my menu watchlist"]').find('li').eq(0).contains("1");
    // });

    // cy.get('[data-cy="movie_card_test"]').eq(0).trigger('mouseover');
    // cy.get("button").contains(/add/i).click();
    //
    // cy.get('[data-cy="movie_card_test"]').eq(1).trigger('mouseover');
    // cy.get("button").contains(/add/i).click();


    // cy.get('[data-cy="movie_card_test"]').eq(1).trigger('mouseover').within(() => {
    //   cy.contains(/add/i).click();
    // });



  });
});

export {};