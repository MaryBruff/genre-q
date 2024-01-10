import React from 'react'
import './Playlist.css'
import PlayistCard from '../PlaylistCard/PlaylistCard'
import NavBar from '../NavBar/NavBar'

const Playlist = ({ playlist, genre }) => {
  return (
    <main className='playlist'>
      <section className='playlist-container'>
        <NavBar />
        <PlayistCard 
          genre={genre}
          playlist={playlist}
        />
      </section>
    </main>
  )
}

export default Playlist