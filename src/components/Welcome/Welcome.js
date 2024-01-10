import React from 'react'
import './Welcome.css'
import GenreQLogo from '../../assets/GenreLogo.svg'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/search')
  }

  return (
    <main className='welcome'>
      <section className='welcome-container'>
        <img src={GenreQLogo} style={{ width: '320px', transform: 'translateY(48px)' }} />
        <h2 className='welcome-title'>Find your next favorite genre</h2>
        <button onClick={handleClick} className='welcome-button'>Get Started</button>
      </section>
    </main>
  )
}

export default Welcome