import React from 'react'
import './GenreBar.css'
import { useNavigate } from 'react-router-dom/';

const GenreBar = ({ genres, setGenre }) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    setGenre(e.target.innerText)
    navigate(`/playlists/${e.target.innerText}`)
  }

  return (
    <section className='genre-container'>
      <h2 className='genre-title'>Genres</h2>
      <div className='genre-result-container'>
      {genres.length === 0 ? 
          <p className='genre-result'>No Genres Found.. Try Again</p> :
          genres.map((genre, index) => {
            return <button key={index} onClick={handleClick} className='genre-result'>{genre}</button>
          })
        }
      </div>
    </section>
  )
}

export default GenreBar