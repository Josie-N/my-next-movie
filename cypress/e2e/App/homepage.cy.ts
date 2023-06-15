
describe('Movie list (switch)', () => {
  beforeEach(() => {
    // Set to desktop viewport
    cy.viewport(1280, 695);
    cy.visit('http://localhost:3000/');
  });

  it('should open the recommended movie list as default homepage', () => {
    cy.get("h1").contains(/the tale of/i).should('exist');
  });
});

export {}
// Typescript treats files without import/exports as legacy script files
// Adding any import or export to a file makes it a module and the error disappear
