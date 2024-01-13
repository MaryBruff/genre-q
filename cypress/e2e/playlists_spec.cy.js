describe('Playlists page', () => {
  beforeEach(() => {
    cy.stubSpotifyToken();

    cy.intercept('GET', 'https://api.spotify.com/v1/search?q=d&type=artist&market=US&limit=10', {
        fixture: 'searchArtists.json',
      }).as('spotifySearch');
    
    cy.intercept('GET', 'https://api.spotify.com/v1/artists/3TVXtAsR1Inumwj472S9r4', {
      fixture: 'artist.json',
    }).as('spotifyArtist');

    cy.intercept('GET', 'https://api.spotify.com/v1/search?type=playlist&limit=10&q=genre%3A%20canadian%20hip%20hop', {
        fixture: 'genrePlaylists.json',
      }).as('spotifyPlaylists');

    cy.intercept('GET', 'https://api.spotify.com/v1/search?type=playlist&limit=10&q=genre%3A%20rap', {
        fixture: 'moreGenrePlaylists.json',
      }).as('spotifyPlaylists2');
  });

  context('Playlist Card Tests', () => {
    it('should display playlist card contents', () => {
      cy.visit('http://localhost:3000/playlists/canadian%20hip%20hop');
      cy.get('.navbar').should('be.visible').and('contain', 'Search');
      cy.get('.swiper-slide-visible > .playlist-card-result > .playlist-card-result-image').should('be.visible');
      cy.get('.swiper-slide-visible > .playlist-card-result > .playlist-card-result-button').should('be.visible');
      cy.get('.swiper-slide-visible > .drag-indicator > span').should('contain', 'Drag Left');
      cy.get('.playlist-genre-container').should('contain', 'Selected Genre');
      cy.get('.playlist-genre-container').should('contain', 'canadian hip hop');
    });

    it('should navigate back to the search page on nav click', () => {
      cy.visit('http://localhost:3000/search');
      cy.get('.search-bar').type('d');
      cy.wait('@spotifySearch');
      cy.get('#react-select-3-option-0').click();
      cy.wait('@spotifyArtist');
      cy.get('.genre-result-container').children().first().click();
      cy.wait('@spotifyPlaylists');
      cy.url().should('include', '/playlists/canadian%20hip%20hop');
      cy.get('.nav-link').click();
      cy.url().should('include', '/search');
      cy.get('.card-artist').should('contain', 'Drake');
      cy.get('.genre-container').should('contain', 'Genres');
      cy.get('.genre-result-container').children().should('have.length', 5);
    });

    it('should navigate to playlists page when a different genre is clicked after returning to the seach page', () => {
      cy.visit('http://localhost:3000/search');
      cy.get('.search-bar').type('d');
      cy.wait('@spotifySearch');
      cy.get('#react-select-3-option-0').click();
      cy.wait('@spotifyArtist');
      cy.get('.genre-result-container').children().first().click();
      cy.wait('@spotifyPlaylists');
      cy.url().should('include', '/playlists/canadian%20hip%20hop');
      cy.get('.nav-link').click();
      cy.url().should('include', '/search');
      cy.get('.genre-result-container').children().last().click();
      cy.wait('@spotifyPlaylists2');
      cy.url().should('include', '/playlists/rap');
      cy.get('.playlist-genre-container').should('contain', 'rap');
    });

    it('should have the correct Spotify playlist URI on the button', () => {
      cy.visit('http://localhost:3000/playlists/canadian%20hip%20hop');
      cy.get('.swiper-slide-visible > .playlist-card-result > .playlist-card-result-button')
        .should('have.attr', 'href', 'spotify:playlist:2hzDwOSCuQxQxFAiyyQJbL');
    });

    it('should display error if incorrect genre is entered in the URL', () => {
      cy.intercept('GET', 'https://api.spotify.com/v1/search?type=playlist&limit=10&q=genre%3A%20goobaagsajwkanrasdgfare', {
        statusCode: 404,
        body: {
          error: {
            status: 404,
            message: 'Not Found'
          }
        }
      }).as('spotifyGenreError');
      cy.visit('http://localhost:3000/playlists/goobaagsajwkanrasdgfare');
      cy.wait('@spotifyGenreError');
      cy.get('.navbar').should('be.visible').and('contain', 'Search');
      cy.get('.playlist-error').should('contain', 'No playlists found for genre: goobaagsajwkanrasdgfare');
    });
  });
});