import React from 'react'
import PropTypes from 'prop-types'
import './Playlist.css'
import PlayistCard from '../PlaylistCard/PlaylistCard'
import NavBar from '../NavBar/NavBar'

const Playlist = ({ accessToken, playlist, genre }) => {
  return (
    <main className='playlist'>
      <section className='playlist-container'>
        <NavBar 
          genre={genre}
        />
        <PlayistCard 
          genre={genre}
          playlist={playlist}
          accessToken={accessToken}
        />
      </section>
    </main>
  )
}

Playlist.propTypes = {
  accessToken: PropTypes.string.isRequired,
  playlist: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string
    })),
    tracks: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.shape({
        track: PropTypes.shape({
          name: PropTypes.string.isRequired,
          artists: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired
          })),
          album: PropTypes.shape({
            images: PropTypes.arrayOf(PropTypes.shape({
              url: PropTypes.string
            }))
          })
        })
      }))
    })
  })).isRequired,
  genre: PropTypes.string.isRequired
};

export default Playlist