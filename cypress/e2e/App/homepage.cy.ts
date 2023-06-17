
describe('App', () => {
  beforeEach(() => {
    // Set to desktop viewport
    cy.viewport(1280, 695);
    cy.visit('http://localhost:3000/');
  });

  it('should open the homepage', () => {
    // should this type of test be covered by unit tests?
    cy.get('h1').invoke('text').should('not.be.empty')
    cy.get("h1").contains(/the tale of/i).should('exist');
  });

  // When I click on topbar logo, I should be redirected to the homepage
});

export {}
// Typescript treats files without import/exports as legacy script files
// Adding any import or export to a file makes it a module and the error disappear
