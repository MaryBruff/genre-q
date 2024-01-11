import React from 'react'
import './Playlist.css'
import PlayistCard from '../PlaylistCard/PlaylistCard'
import NavBar from '../NavBar/NavBar'

const Playlist = ({ accessToken, playlist, genre }) => {
  return (
    <main className='playlist'>
      <section className='playlist-container'>
        <NavBar 
          genre={genre}
        />
        <PlayistCard 
          genre={genre}
          playlist={playlist}
          accessToken={accessToken}
        />
      </section>
    </main>
  )
}

export default Playlist