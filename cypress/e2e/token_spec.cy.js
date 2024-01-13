describe('Error page', () => {
  it('should return token on successful request', () => {
    cy.stubSpotifyToken();
    cy.visit('http://localhost:3000/');
    cy.wait('@getSpotifyToken');
    cy.url().should('include', '/');
    cy.get('.welcome-button').should('be.visible');
  });

  it('should navigate to the error page if the Auth fails', () => {
    cy.intercept('POST', 'https://accounts.spotify.com/api/token', {
    statusCode: 403,
    body: {
        error: "invalid_client",
        error_description: "Invalid client secret"
    }
    }).as('spotifyTokenError');
    cy.visit('http://localhost:3000/');
    cy.wait('@spotifyTokenError');
    cy.url().should('include', '/error');
    cy.get('h2').should('contain', '500');
    cy.get('p').should('contain', 'Something is wrong on our end!'); 
  });
});