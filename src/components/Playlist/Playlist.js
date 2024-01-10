import React from 'react'
import './Playlist.css'
import PlayistCard from '../PlaylistCard/PlaylistCard'
import NavBar from '../NavBar/NavBar'

const Playlist = ({ playlist, setPlaylist, genre }) => {
  return (
    <main className='playlist'>
      <section className='playlist-container'>
        <NavBar />
        <PlayistCard 
          genre={genre}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
      </section>
    </main>
  )
}

export default Playlist