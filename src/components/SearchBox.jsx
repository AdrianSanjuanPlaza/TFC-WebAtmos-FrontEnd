import React, { useState } from 'react'; 
import { InputGroup, FormControl, Button } from 'react-bootstrap'; 
import { IoSearch } from "react-icons/io5";

function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchTerm);
        }
    };

    return (
        <div className='searchBox position-relative d-flex align-items-center w-100'>
            <IoSearch />
            <input
                type="text"
                placeholder='Buscar...'
                className='w-100'
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default SearchBox;