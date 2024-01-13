import React from 'react'
import PropTypes from 'prop-types'
import './Search.css'
import GenreQLogo from '../../assets/GenreLogo.svg'
import ArtistCard from '../ArtistCard/ArtistCard'
import SearchBar from '../SearchBar/SearchBar'
import NavBar from '../NavBar/NavBar'

const Search = ({ artist, genre, setArtist, setGenre, accessToken }) => {
  return (
    <main className="search">
      <section className='search-container'>
        <NavBar 
          genre={genre}
        />
        <div className='search-and-card'>
          <SearchBar
            accessToken={accessToken}
            setArtist={setArtist}
          />
          {artist && <ArtistCard 
            artist={artist}
            setGenre={setGenre}
          />}
        </div>
      </section>
    </main>
  )
}

Search.propTypes = {
  artist: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string
    })),
    genres: PropTypes.arrayOf(PropTypes.string),
  })),
  genre: PropTypes.string.isRequired,
  setArtist: PropTypes.func.isRequired,
  setGenre: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired
};

export default Search