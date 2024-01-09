import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} /> 
        <Route path="/search" element={<Search/>} />
        <Route path="/playlists/:genre" element={<Playlist />} />
      </Routes>
    </div>
  )
}

export default App