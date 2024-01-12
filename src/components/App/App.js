import React, { useState } from 'react'
import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist';
import Missing from '../Missing/Missing';
import Error from '../Error/Error';
import useSpotifyToken from '../../hooks/useSpotifyToken';


const App = () => {
  const accessToken = useSpotifyToken();
  const [artist, setArtist] = useState();
  const [genre, setGenre] = useState();
  const [playlist, setPlaylist] = useState();

  return (
    <main className='App'>
      <Routes>
        <Route path="/" element={<Welcome />} /> 
        <Route path="/search" element={
          <Search
            artist={artist}
            genre={genre}
            setArtist={setArtist}
            setGenre={setGenre}
            accessToken={accessToken}
          />} 
        />
        <Route path="/playlists/:genre" element={
          <Playlist
            playlist={playlist}
            genre={genre}
            setPlaylist={setPlaylist}
            setGenre={setGenre}
            accessToken={accessToken}
          />} 
        />
        <Route path='/expired' element={<Error />} />
        <Route path="/*" element={<Missing />} />
      </Routes>
    </main>
  )
}

export default App