describe('API call errors', () => {
    before(() => {
        cy.viewport(1280, 695);
    });

    const errorTitle = /Sorry. Something went wrong./i;
    const errorMsg = /404 Not Found/i;

    it('simulates a client side error', () => {
        cy.intercept("GET",
            "/api/movies*",
            {
                statusCode: 404,
                body: {error: errorMsg}
            })
            .as("getClientsideError");

        cy.visit('http://localhost:3000/');

        // Wait for the response to finish
        cy.wait('@getClientsideError');

        cy.get('[data-testid="cy-error-title"]').contains(errorTitle).should('exist');
        cy.get('[data-testid="cy-error-description"]').contains(errorMsg).should('exist');
    });

    it("simulates a network error", () => {
        cy.intercept("GET",
            "/api/movies*",
            { forceNetworkError: true }
        )
            .as("getNetworkError");

        cy.visit('http://localhost:3000/');

        // Wait for the response to finish
        cy.wait('@getNetworkError');

        cy.get('[data-testid="cy-error-title"]').contains(errorTitle).should('exist');
    });
});

export {}
