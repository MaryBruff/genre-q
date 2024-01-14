import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './PlaylistCard.css'
import { useNavigate, useParams } from 'react-router-dom';
import NoImage from '../../assets/no-image.png'
import Arrow from '../../assets/arrow-basic.svg'
import SpotifyLogo from '../../assets/Spotify_icon.png'
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation } from 'swiper/modules';


const PlaylistCard = ({ accessToken, genre: propGenre, playlist: propPlaylist }) => {
  const navigate = useNavigate();
  const [hasDragged, setHasDragged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [playlist, setPlaylist] = useState(propPlaylist || []);
  const [genre, setGenre] = useState(propGenre);
  const { genre: urlGenre } = useParams();

  const handleSlideChange = () => {
    setHasDragged(true);
  };

  useEffect(() => {
    setHasDragged(false);
  }, [playlist]);

  useEffect(() => {
    if (propPlaylist.length === 0 && urlGenre) {
      fetchPlaylists(urlGenre);
    } else {
      setGenre(propGenre);
    }
  }, [urlGenre, propGenre, propPlaylist]);

  const fetchPlaylists = async (genre) => {
    const genreQuery = encodeURIComponent(`genre: ${urlGenre}`)
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=playlist&q=${genreQuery}&market=US&limit=10`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      });

      let errorResponse;
      
      switch (response.status) {
        case 401:
        case 429:
          errorResponse = await response.json();
          navigate('/error', { state: { statusCode: response.status, message: errorResponse.error.message } });
          return [];
        case 500:
          throw new Error('Oh no, something went wrong on our end!');
      }

      if (!response.ok) {
        setErrorMessage(`No playlists found for genre: ${genre}`);
        setPlaylist([]);
        return;
      }
  
      const data = await response.json();
      if (data.playlists && data.playlists.items.length > 0) {
        setPlaylist(data.playlists.items);
        setGenre(genre);
        setErrorMessage('');
      } else {
        setErrorMessage("No playlists found for this genre 🥲");
        setPlaylist([]);
      }
    } catch (error) {
      navigate('/error', { state: { statusCode: 500, message: error.message } });
    }
  };


  return (
    <>
    {errorMessage ? <p className='playlist-error'>{errorMessage}</p> :
    
    <main className='playlist-card'>
      <section className='playlist-card-container'>
        <Swiper
          effect={'cards'}
          rewind={true}
          navigation={true}
          grabCursor={true}
          onSlideChange={handleSlideChange}
          modules={[EffectCards, Navigation]}
          className="swiper-container"
        >
          {playlist.map((playlist, index) => {
            const imageUrl = playlist.images[0].url ? playlist.images[0].url : NoImage;
            return (
              <SwiperSlide key={index}>
                {!hasDragged && (
                  <div className="drag-indicator">
                    <img className='drag-arrow' src={Arrow} alt="Arrow" />
                    <span>Drag Left</span>
                  </div>
                )}
                <div className='playlist-card-result'>
                  {/* href implementation in case URI link does not redirect */}
                  {/* <a 
                    href={playlist.external_urls.spotify} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className='playlist-card-result-button'>
                      Listen on Spotify
                  </a> */}
                  <a href={playlist.uri} className='playlist-card-result-button' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={SpotifyLogo} alt="Spotify Logo" style={{ width: '25px', height: '25px', marginRight: '8px' }} />
                    Listen on Spotify
                  </a>
                  <img className='playlist-card-result-image' src={imageUrl} alt={playlist.name} />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>
      <section className='playlist-genre-container'>
        <h2 className='playlist-genre-title'>Selected Genre</h2>
        <div className='playlist-genre-result-container'>
          <p className='playlist-genre-result'>{genre}</p>
        </div>
      </section>
    </main>}
    </>
  )
}

PlaylistCard.propTypes = {
  accessToken: PropTypes.string.isRequired,
  genre: PropTypes.string,
  playlist: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    external_urls: PropTypes.shape({
      spotify: PropTypes.string.isRequired
    }),
    uri: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string
    }))
  }))
};

export default PlaylistCard