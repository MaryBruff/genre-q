describe('Error page', () => {
  beforeEach(() => {
    cy.stubSpotifyToken();

    cy.intercept('GET', 'https://api.spotify.com/v1/search*', {
      statusCode: 401,
      body: {
        error: {
          status: 401,
          message: 'Unauthorized - Your session has expired.'
        }
      }
    }).as('spotify401');

    cy.intercept('GET', 'https://api.spotify.com/v1/search?q=d&type=artist&market=US&limit=10', {
      fixture: 'searchArtists.json',
    }).as('spotifySearch');

    cy.intercept('GET', 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4', {
      fixture: 'artist.json',
    }).as('spotifyArtist');
  });

  it('should display error page', () => {
    cy.visit('http://localhost:3000/error');
    cy.get('h2').should('contain', '😵‍💫');
    cy.get('p').should('contain', 'An unknown error occurred'); 
  });

  it('navigates to search on button click', () => {
    cy.visit('http://localhost:3000/error');
    cy.get('.missing-page-button').click();
    cy.url().should('include', '/search'); 
  });

  it('should navigate to the error page if the token is expired when searching', () => {
    cy.visit('http://localhost:3000/search');
    cy.get('.search-bar').type('K');
    cy.url().should('include', '/error');
    cy.get('h2').should('contain', '401');
    cy.get('p').should('contain', 'Unauthorized - Your session has expired.'); 
  });

  it('should navigate to the error page if the token is expired when selecting a genre', () => {
    cy.visit('http://localhost:3000/search');
    cy.get('.css-p4kzcr-Input').type('d{enter}');
    cy.get('.genre-result-container').children().first().click();
  });
});