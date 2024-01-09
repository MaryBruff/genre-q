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


  return (
    <main className='App'>
      <Routes>
        <Route path="/" element={<Welcome />} /> 
        <Route path="/search" element={
          <Search
            artist={artist}
            setArtist={setArtist}
            accessToken={accessToken}
          />} 
        />
        <Route path="/playlists/:genre" element={<Playlist />} />
      </Routes>
    </main>
  )
}

export default App