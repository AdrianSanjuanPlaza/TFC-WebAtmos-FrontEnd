import React from 'react'
import { IoSearch } from "react-icons/io5";

function SearchBox() {
  return (
    <>
    <div className='searchBox position-relative d-flex align-items-center'>
        <IoSearch />
        <input type="text" placeholder='Buscar...' className='w-100'/>
    </div>
    </>
  )
}

export default SearchBox