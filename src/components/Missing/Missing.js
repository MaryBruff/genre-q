import React from 'react'
import './Missing.css'
import { useNavigate } from 'react-router-dom'
import HuhGif from '../../assets/huh.gif'

const Missing = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/search')
  }
  return (
    <main className='missing'>
      <section className='missing-container'>
        <div className='missing-title-container'>
          <h2 className='missing-title'>404</h2>
          <p className='missing-message'>Huh, no playlists here..</p>
        </div>
        <img className='missing-image' src={HuhGif} alt='404 Cat' />
        <button onClick={handleClick} className='missing-page-button'>Back to Search</button>
      </section>
    </main>
  )
}

export default Missing