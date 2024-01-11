import React, { useEffect, useState } from 'react'
import './PlaylistCard.css'
import { useParams } from 'react-router-dom';
import NoImage from '../../assets/no-image.png'
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';


const PlaylistCard = ({ accessToken, genre: propGenre, playlist: propPlaylist }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [playlist, setPlaylist] = useState(propPlaylist || []);
  const [genre, setGenre] = useState(propGenre);
  const { genre: urlGenre } = useParams();

  useEffect(() => {
    if (!propPlaylist && urlGenre) {
      fetchPlaylists(urlGenre);
    } else {
      setGenre(propGenre);
    }
  }, [urlGenre, propGenre, propPlaylist]);

  const fetchPlaylists = async (genre) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=playlist&limit=10&q=${encodeURIComponent(`genre: ${genre}`)}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      });
  
      if (!response.ok) {
        setErrorMessage(`No playlists found for genre: ${genre}`);
        setPlaylist([]);
        return;
      }
  
      const data = await response.json();
  
      if (data.playlists && data.playlists.items) {
        setPlaylist(data.playlists.items);
        setGenre(genre);
        setErrorMessage('');
      } else {
        setErrorMessage("No playlists found for this genre");
        setPlaylist([]);
      }
    } catch (error) {
      console.error("Error fetching playlists: ", error);
      setErrorMessage("Error fetching playlists");
      setPlaylist([]);
    }
  };


  return (
    <>
    {errorMessage ? <p>{errorMessage}</p> :
    
    <main className='playlist-card'>
      <section className='playlist-card-container'>
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="swiper-container"
        >
          {playlist.map((playlist, index) => {
            const imageUrl = playlist.images[0].url ? playlist.images[0].url : NoImage;
            return (
              <SwiperSlide key={index}>
                <div className='playlist-card-result'>
                  {/* href implementation in case URI link does not redirect */}
                  {/* <a 
                    href={playlist.external_urls.spotify} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className='playlist-card-result-button'>
                      Listen on Spotify
                  </a> */}
                  <a 
                    href={playlist.uri} 
                    className='playlist-card-result-button'>
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

export default PlaylistCard