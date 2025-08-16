import React, { useEffect, useState } from 'react';
import { fetchGenres, fetchRecentMoviesByGenre } from './genreApi';
import MovieCard from './MovieCard';

function GenreSections({ onSelect }) {
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGenresAndMovies() {
      setLoading(true);
      const genreList = await fetchGenres();
      setGenres(genreList);
      // Limit to first 5 genres for performance/UI
      const limitedGenres = genreList.slice(0, 5);
      const moviesData = {};
      for (const genre of limitedGenres) {
        moviesData[genre.id] = await fetchRecentMoviesByGenre(genre.id);
      }
      setMoviesByGenre(moviesData);
      setLoading(false);
    }
    loadGenresAndMovies();
  }, []);

  if (loading) return <p>Loading genres...</p>;

  return (
    <div className="genre-sections">
      {genres.slice(0, 5).map(genre => (
        <div key={genre.id} className="genre-block">
          <h2>{genre.name}</h2>
          <div className="movies-grid">
            {(moviesByGenre[genre.id] || []).slice(0, 4).map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} onSelect={onSelect} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GenreSections;
