import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'

const NavBar = ({ genre }) => {
  return (
    <nav className='navbar'>
      <NavLink className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'} to="/search">Search</NavLink>
      {genre ? (
        <NavLink className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'} to={`/playlists/${genre}`}>Playlists</NavLink>
      ) : (
        <span className='nav-link-disabled'>Playlists</span>
      )}
    </nav>
  )
}

export default NavBar