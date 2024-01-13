import React from 'react'
import PropTypes from 'prop-types'
import './ArtistCard.css'
import GenreBar from '../GenreBar/GenreBar'
import NoImage from '../../assets/no-image.png'

const ArtistCard = ({ artist, setGenre }) => {
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
      />
    </main>
  )
}

ArtistCard.propTypes = {
  artist: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string
    })),
    genres: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  setGenre: PropTypes.func.isRequired
};

export default ArtistCard