import React from 'react'
import './ArtistCard.css'
import GenreBar from '../GenreBar/GenreBar'
import NoImage from '../../assets/no-image.png'

const ArtistCard = ({ artist, setGenre, setPlaylist, accessToken }) => {
  const imageUrl = artist[0].images[0] ? artist[0].images[0].url : NoImage;

  return (
    <main className='card'>
      <div className='card-picture'>
        <img src={imageUrl} alt={artist[0].name}/>
      </div>
      <h3 className='card-artist'>{artist[0].name}</h3>
      <GenreBar 
        genres={artist[0].genres}
        setGenre={setGenre}
        setPlaylist={setPlaylist}
        accessToken={accessToken}
      />
    </main>
  )
}

export default ArtistCard