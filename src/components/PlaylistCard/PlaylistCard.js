import React from 'react'
import './PlaylistCard.css'

const PlaylistCard = ({ genre, playlist, setPlaylist }) => {
  return (
    <main className='playlist-card'>
      Cool ass Carousel
      <section className='genre-container'>
        <h2 className='genre-title'>Genre</h2>
        <div className='genre-result-container'>
          <p className='genre-result'>{genre}</p>
        </div>
      </section>
    </main>
  )
}

export default PlaylistCard