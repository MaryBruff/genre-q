import React from 'react'
import './SearchBar.css'
import AsyncSelect from 'react-select/async';

const SearchBar = ({  }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#11113A',
      marginBottom: '10px',
      border: '1px solid #ccc',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      '&:hover': { borderColor: '#F294FF' }
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
  return (
    <main className='search-bar'>
      <AsyncSelect 
        styles={customStyles}
      />
    </main>
  )
}

export default SearchBar