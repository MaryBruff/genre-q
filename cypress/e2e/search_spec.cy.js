describe('Search page', () => {
  beforeEach(() => {
    cy.stubSpotifyToken();
    cy.visit('http://localhost:3000/search');

    cy.intercept('GET', 'https://api.spotify.com/v1/search?q=d&type=artist&market=US', {
        fixture: 'searchArtists.json',
      }).as('spotifySearch');
    
    cy.intercept('GET', 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4', {
      fixture: 'artist.json',
    }).as('spotifyArtist');

    cy.intercept('GET', 'https://api.spotify.com/v1/search?type=playlist&q=genre%3A%20canadian%20hip%20hop&market=US&limit=10', {
        fixture: 'genrePlaylists.json',
      }).as('spotifyPlaylists');
  });

  context('SearchBar Tests', () => {
    it('should display search page contents', () => {
      cy.get('.navbar').should('be.visible').and('contain', 'Search');
      cy.get('.search-and-card').should('be.visible');
    });

    it('should display search results on successful search', () => {
      cy.get('.search-bar').type('d');
      cy.wait('@spotifySearch');
      cy.get('#react-select-3-listbox').should('be.visible');
      cy.get('#react-select-3-listbox').children().should('have.length', 20);
    });
  });

  context('ArtistCard Tests', () => {
    it('should display artist card contents', () => {
      cy.get('.search-bar').type('d');
      cy.wait('@spotifySearch');
      cy.get('#react-select-3-option-0').click();
      cy.wait('@spotifyArtist');
      cy.get('.search-and-card').should('be.visible');
      cy.get('.card-picture img').should('be.visible');
      cy.get('.card-artist').should('contain', 'Drake');
      cy.get('.genre-container').should('contain', 'Genres');
      cy.get('.genre-result-container').children().should('have.length', 5);
    });

    it('should navigate to playlist page on genre click', () => {
      cy.get('.search-bar').type('d');
      cy.wait('@spotifySearch');
      cy.get('#react-select-3-option-0').click();
      cy.wait('@spotifyArtist');
      cy.get('.genre-result-container').children().first().click();
      cy.wait('@spotifyPlaylists');
      cy.url().should('include', '/playlists/canadian%20hip%20hop');
    });
  });
});
