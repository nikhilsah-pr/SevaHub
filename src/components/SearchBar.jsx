import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineLocationMarker } from 'react-icons/hi';

export default function SearchBar({ onSearch, placeholder = 'Search for services...' }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <div className="search-bar-icon">
        <FiSearch />
      </div>
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (onSearch) onSearch(e.target.value);
        }}
      />
      <div className="search-bar-location">
        <HiOutlineLocationMarker />
        <span>Bangalore</span>
      </div>
    </form>
  );
}
