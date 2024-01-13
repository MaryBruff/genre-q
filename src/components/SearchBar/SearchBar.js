import React from 'react'
import './SearchBar.css'
import { useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

const SearchBar = ({ accessToken, setArtist }) => {
  const navigate = useNavigate();
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#11113A',
      marginBottom: '10px',
      border: '1px solid transparent;',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      '&:hover': { border: '1px solid', borderColor: '#B983EF' }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: '#11113A',
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', 
    }),
    input: (provided) => ({
      ...provided,
      color: 'white', 
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#11113A',
    }),
  };

  const loadOptions = async (inputValue) => {
    if (!inputValue) {
      return [];
    }
  
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${inputValue}&type=artist&market=US&limit=10`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        }
      );
      
      switch (response.status) {
        case 401:
          const errorResponse = await response.json();
          navigate('/error', { state: { statusCode: response.status, message: errorResponse.error.message } });
          return [];
        case 200:
          const data = await response.json();
          return data.artists.items.map((artist) => ({
            value: artist.id,
            label: artist.name
          }));
      }
  
    } catch (error) {
      navigate('/error', { state: { statusCode: 500, message: error.message } });
    }
  };

  const handleSelect = async (selectedOption) => {
    try {
      // Fetch the artist's details using the artist's ID
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${selectedOption.value}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        }
      );

      switch (response.status) {
        case 401:
          const errorResponse = await response.json();
          navigate('/error', { state: { statusCode: response.status, message: errorResponse.error.message } });
          return [];
        case 200:
          const artistData = await response.json();
          setArtist([artistData]);
      }

    } catch (error) {
      navigate('/error', { state: { statusCode: 500, message: error.message } });
    }
  };

  return (
    <main className='search-bar'>
      <AsyncSelect 
        styles={customStyles}
        placeholder="Search Artist..."
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleSelect}
      />
    </main>
  )
}

export default SearchBar