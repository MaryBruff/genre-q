import React, { useEffect, useState } from 'react'
import './Error.css'
import { useNavigate, useLocation } from 'react-router-dom'
import Huh from '../../assets/huh.gif'
import ExcuseMe from '../../assets/excuseme.gif'
import Maths from '../../assets/confused-numbers.gif'

const Error = () => {
  const [randomImage, setRandomImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { statusCode, message } = location.state || { statusCode: '😵‍💫', message: 'An unknown error occurred'}

  const handleClick = () => {
    window.history.pushState({}, '', '/search');
    window.location.reload();
  }

  useEffect(() => {
    const images = [Huh, ExcuseMe, Maths];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setRandomImage(randomImage);
  }, [])

  return (
    <main className='missing'>
      <section className='missing-container'>
        <div className='missing-title-container'>
          <h2 className='missing-title'>{statusCode}</h2>
          <p className='missing-message'>{message}</p>
        </div>
        <img className='missing-image' src={randomImage} alt='Error Gif' />
        <button onClick={handleClick} className='missing-page-button'>Back to search</button>
      </section>
    </main>
  )
}

export default Error