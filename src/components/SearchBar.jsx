import React from 'react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or specialization..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;
