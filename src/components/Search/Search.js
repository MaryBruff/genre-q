import React from 'react'
import './Search.css'
import GenreQLogo from '../../assets/GenreLogo.svg'
import ArtistCard from '../ArtistCard/ArtistCard'
import SearchBar from '../SearchBar/SearchBar'
import NavBar from '../NavBar/NavBar'

const Search = ({ artist, setArtist, accessToken }) => {
  return (
    <main className="search">
      <section className='search-container'>
        {/* <img className='logo' src={GenreQLogo}/> */}
        {/* <h2 className='genre-header'>Find your next favorite genre</h2> */}
        <NavBar />
        <div className='search-and-card'>
          <SearchBar
            accessToken={accessToken}
            setArtist={setArtist}
          />
          <ArtistCard 
            artist={artist}
          />
        </div>
      </section>
    </main>
  )
}

export default Search