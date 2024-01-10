import React from 'react'
import './Search.css'
import GenreQLogo from '../../assets/GenreLogo.svg'
import ArtistCard from '../ArtistCard/ArtistCard'
import SearchBar from '../SearchBar/SearchBar'
import NavBar from '../NavBar/NavBar'

const Search = ({ artist, setArtist, accessToken, setGenre }) => {
  return (
    <main className="search">
      <section className='search-container'>
        <NavBar />
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

export default Search