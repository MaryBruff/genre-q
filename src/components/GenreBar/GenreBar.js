import React from 'react'
import './GenreBar.css'

const GenreBar = () => {
  return (
    <section className='genre-container'>
      <h2 className='genre-title'>Genres</h2>
      <div className='genre-result-container'>
        <p className='genre-result'>Corrosion</p>
        <p className='genre-result'>Gothic Rock</p>
        <p className='genre-result'>Industrial Rock</p>
        <p className='genre-result'>Permanent Wave</p>
        <p className='genre-result'>Dubstep</p>
        <p className='genre-result'>Sadstep</p>
      </div>
    </section>
  )
}

export default GenreBar