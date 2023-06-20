
describe('Movie card', () => {
    beforeEach(() => {
        cy.viewport(1280, 695);
        cy.apiStubWatchlistEmpty();
        cy.visit('http://localhost:3000/');
        cy.checkHomepageIsSelected();
    });

    it("should collapse when clicked once", () => {
        cy.get('[data-testid="cy-movie-card"]').eq(0).click();
        cy.get("h4").contains(/1st movie title/i).should('exist');
        cy.get("p").contains(/1st movie card description/i).should('not.exist');
    });

    it("should expand when clicked twice", () => {
        cy.get('[data-testid="cy-movie-card"]').eq(0).click();
        cy.get("h4").contains(/1st movie title/i).click();
        cy.get("p").contains(/1st movie card description/i).should('exist');
    });

    it("should display ADD and REMOVE buttons when hovered", () => {
        cy.get('[data-testid="cy-movie-card"]').eq(0).trigger('mouseover');
        cy.get("button").contains(/Add/i).should('exist');
        cy.get("button").contains(/Remove/i).should('exist');
    });
});

export {};