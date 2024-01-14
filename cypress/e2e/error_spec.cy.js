describe('Error page', () => {
  beforeEach(() => {
    cy.stubSpotifyToken();

    cy.intercept('GET', 'https://api.spotify.com/v1/search?q=d&type=artist&market=US', {
        fixture: 'searchArtists.json',
      }).as('spotifySearch');
    
    cy.intercept('GET', 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4', {
      fixture: 'artist.json',
    }).as('spotifyArtist');
  });

  context('Load Tests', () => {
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
  });

  context('401 Unauthorized Tests', () => {
    it('should navigate to the error page if the token is expired when searching', () => {
      cy.intercept('GET', 'https://api.spotify.com/v1/search?q=d&type=artist&market=US', {
        statusCode: 401,
        body: {
          error: {
            status: 401,
            message: 'Unauthorized - Your session has expired.'
          }
        }
      }).as('spotifySearchError');

      cy.visit('http://localhost:3000/search');
      cy.get('.search-bar').type('d');
      cy.url().should('include', '/error');
      cy.get('h2').should('contain', '401');
      cy.get('p').should('contain', 'Unauthorized - Your session has expired.'); 
    });
    
    it('should navigate to the error page if the token is expired when selecting a genre', () => {
      cy.intercept('GET', 'https://api.spotify.com/v1/search?type=playlist&q=genre%3A%20canadian%20hip%20hop&market=US&limit=10', {
        statusCode: 401,
        body: {
          error: {
            status: 401,
            message: 'Unauthorized - Your session has expired.'
          }
        }
      }).as('spotifyGenreError');

      cy.visit('http://localhost:3000/search');
      cy.get('.search-and-card').type('d');
      cy.wait('@spotifySearch');
      cy.get('#react-select-3-option-0').click();
      cy.wait('@spotifyArtist');
      cy.get('.genre-result-container').children().first().click();
      cy.url().should('include', '/error');
      cy.get('h2').should('contain', '401');
      cy.get('p').should('contain', 'Unauthorized - Your session has expired.'); 
    });
  });

  context('429 Too Many Requests Tests', () => {
    it('should navigate to the error page if too many requests are made when searching', () => {
      cy.intercept('GET', 'https://api.spotify.com/v1/search?q=d&type=artist&market=US', {
        statusCode: 429,
        body: {
          error: {
            status: 429,
            message: 'Too many requests.'
          }
        }
      }).as('spotifySearchError');

      cy.visit('http://localhost:3000/search');
      cy.get('.search-bar').type('d');
      cy.url().should('include', '/error');
      cy.get('h2').should('contain', '429');
      cy.get('p').should('contain', 'Too many requests.'); 
    });

    it('should navigate to the error page if too many requests are made when selecting a genre', () => {
      cy.intercept('GET', 'https://api.spotify.com/v1/search?type=playlist&q=genre%3A%20canadian%20hip%20hop&market=US&limit=10', {
        statusCode: 429,
        body: {
          error: {
            status: 429,
            message: 'Too many requests.'
          }
        }
      }).as('spotifyGenreError');

      cy.visit('http://localhost:3000/search');
      cy.get('.search-and-card').type('d');
      cy.wait('@spotifySearch');
      cy.get('#react-select-3-option-0').click();
      cy.wait('@spotifyArtist');
      cy.get('.genre-result-container').children().first().click();
      cy.url().should('include', '/error');
      cy.get('h2').should('contain', '429');
      cy.get('p').should('contain', 'Too many requests.'); 
    });
  });

  context('500 Internal Server Error Tests', () => {
    it('should navigate to the error page if the server is down when searching', () => {
      cy.intercept('GET', 'https://api.spotify.com/v1/search?q=d&type=artist&market=US', {
        statusCode: 500,
        body: {
          error: {
            status: 500,
            message: 'Oh no, something went wrong on our end!'
          }
        }
      }).as('spotifySearchError');

      cy.visit('http://localhost:3000/search');
      cy.get('.search-bar').type('d');
      cy.url().should('include', '/error');
      cy.get('h2').should('contain', '500');
      cy.get('p').should('contain', 'Oh no, something went wrong on our end!'); 
    });

    it('should navigate to the error page if the server is down when selecting a genre', () => {
      cy.intercept('GET', 'https://api.spotify.com/v1/search?type=playlist&q=genre%3A%20canadian%20hip%20hop&market=US&limit=10', {
        statusCode: 500,
        body: {
          error: {
            status: 500,
            message: 'Oh no, something went wrong on our end!'
          }
        }
      }).as('spotifyGenreError');

      cy.visit('http://localhost:3000/search');
      cy.get('.search-and-card').type('d');
      cy.wait('@spotifySearch');
      cy.get('#react-select-3-option-0').click();
      cy.wait('@spotifyArtist');
      cy.get('.genre-result-container').children().first().click();
      cy.url().should('include', '/error');
      cy.get('h2').should('contain', '500');
      cy.get('p').should('contain', 'Oh no, something went wrong on our end!'); 
    });
  });

  context('Missing catch-all route Tests', () => {
    it('should display missing page contents', () => {
      cy.visit('http://localhost:3000/sdgthtsrtyhshhss');
      cy.get('h2').should('contain', '404');
      cy.get('p').should('contain', 'Huh, no playlists here..'); 
    });
  });
});