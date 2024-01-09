import React, { useState } from 'react'
import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Search from '../Search/Search';
import Playlist from '../Playlist/Playlist';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} /> 
      </Routes>
        <nav>
          <NavLink to="/search" className="nav">Search</NavLink>
          <NavLink to="/playlists/:genre" className="nav">Playlists</NavLink>
        </nav>
    </div>
  )
}

export default App