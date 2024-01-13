Cypress.Commands.add('stubSpotifyToken', () => {
  cy.intercept('POST', 'https://accounts.spotify.com/api/token', {
    statusCode: 200,
    body: {
      access_token: 'wannabe-access-token',
      token_type: 'Bearer',
      expires_in: 3600,
    },
  }).as('getSpotifyToken');
});