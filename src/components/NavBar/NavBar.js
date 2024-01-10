import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <NavLink className='nav-search' to="/search">Search</NavLink>
      <NavLink className='nav-playlists' to="/playlists/:genre">Playlists</NavLink>
    </nav>
  )
}

export default NavBar