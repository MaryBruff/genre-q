import React, { useRef, useState } from 'react'
import './PlaylistCard.css'
import NoImage from '../../assets/no-image.png'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';


const PlaylistCard = ({ genre, playlist }) => {
  console.log("PlaylistCard", playlist)

  if (!playlist || playlist.length === 0) {
    return <p>Loading playlists...</p>; 
  }
  return (
    <main className='playlist-card'>
      <section className='playlist-card-container'>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="swiper-container"
        >
          {playlist.map((playlist, index) => {
            const imageUrl = playlist.images[0].url ? playlist.images[0].url : NoImage;
            return (
              <SwiperSlide key={index}>
                <div className='playlist-card-result'>
                  <a 
                    href={playlist.external_urls.spotify} 
                    target="_blank" 
                    rel="noopener noreferrer" 
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
      <section className='genre-container'>
        <h2 className='genre-title'>Genre</h2>
        <div className='genre-result-container'>
          <p className='genre-result'>{genre}</p>
        </div>
      </section>
    </main>
  )
}

export default PlaylistCard