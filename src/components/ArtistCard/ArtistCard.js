import React from 'react'
import './ArtistCard.css'
import GenreBar from '../GenreBar/GenreBar'
import SOMPic from '../../assets/sistersOfMercy.jpeg'

const ArtistCard = () => {
  return (
    <main className='card'>
      <div className='card-picture'>
        <img src={SOMPic} alt="Sisters of Mercy"/>
      </div>
      <GenreBar />
      <h3 className='card-artist'>Sisters of Mercy</h3>
    </main>
  )
}

export default ArtistCard