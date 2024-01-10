import React, { useState } from 'react'
import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist';
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
            setArtist={setArtist}
            accessToken={accessToken}
            setGenre={setGenre}
          />} 
        />
        <Route path="/playlists/:genre" element={
          <Playlist
            playlist={playlist}
            setPlaylist={setPlaylist}
            genre={genre}
          />} 
        />
      </Routes>
    </main>
  )
}

export default App