describe('Welcome page', () => {
  beforeEach(() => {
    cy.stubSpotifyToken();
    cy.visit('http://localhost:3000');
  });

  it('should display welcome page contents', () => {
    cy.get('img').should('be.visible');
    cy.get('.welcome-title').should('contain', 'Find your next favorite genre');
    cy.get('.welcome-button').should('be.visible');
  });

  it('should navigate to the search page when the button is clicked', () => {
    cy.get('.welcome-button').click();
    cy.url().should('include', '/search');
  });
});