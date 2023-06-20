describe('Homepage new user', () => {
    beforeEach(() => {
        // Set to desktop viewport
        cy.viewport(1280, 695);

        // API calls for username and lists available
        cy.apiStubWatchlistEmpty();

        // Visit homepage
        cy.visit('http://localhost:3000/');
        cy.screenshot();
    });

    it('should render the main heading', () => {
        cy.get("h1").should('exist');
        cy.get('[data-testid="accessible heading"]').contains(/the tale of/i).should('exist');
    });

    it('should have movie list', () => {
       cy.checkListIsSelected();
       cy.checkHomepageIsSelected();
    });
});

export {}
