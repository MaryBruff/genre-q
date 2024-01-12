import React from 'react'
import './Error.css'
import { useNavigate } from 'react-router-dom'
import ExcuseMeGif from '../../assets/excuseme.gif'

const Error = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    window.history.pushState({}, '', '/search');
    window.location.reload();
  }
  return (
    <main className='missing'>
      <section className='missing-container'>
        <div className='missing-title-container'>
          <h2 className='missing-title'>401</h2>
          <p className='missing-message'>Uh oh, your session expired..</p>
        </div>
        <img className='missing-image' src={ExcuseMeGif} alt='404 Cat' />
        <button onClick={handleClick} className='missing-page-button'>Back to search</button>
      </section>
    </main>
  )
}

export default Error