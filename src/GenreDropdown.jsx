import React, { useEffect, useState } from 'react';
import { fetchGenres } from './genreApi';

function GenreDropdown({ onSelect }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  return (
    <select className="genre-dropdown" onChange={e => onSelect(e.target.value)} defaultValue="">
      <option value="" disabled>Search by Genre...</option>
      {genres.map(genre => (
        <option key={genre.id} value={genre.id}>{genre.name}</option>
      ))}
    </select>
  );
}

export default GenreDropdown;
