

import { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import { fetchMovies, fetchMovieDetails } from './api';
import { fetchRecentMoviesByGenre } from './genreApi';
import GenreSections from './GenreSections';
import GenreDropdown from './GenreDropdown';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchBarKey, setSearchBarKey] = useState(0);
  // Navigation stack: 'home', 'search', 'details'
  const [navStack, setNavStack] = useState(['home']);

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setSelectedMovie(null);
    try {
      const results = await fetchMovies(query);
      setMovies(results);
      if (results.length === 0) setError('No movies found.');
      setNavStack(stack => [...stack, 'search']);
    } catch (e) {
      setError('Failed to fetch movies.');
    }
    setLoading(false);
  };

  const handleGenreSearch = async (genreId) => {
    if (!genreId) return;
    setLoading(true);
    setError('');
    setSelectedMovie(null);
    try {
      const results = await fetchRecentMoviesByGenre(genreId);
      setMovies(results);
      if (results.length === 0) setError('No movies found for this genre.');
      setNavStack(stack => [...stack, 'search']);
    } catch (e) {
      setError('Failed to fetch movies by genre.');
    }
    setLoading(false);
  };

  const handleSelectMovie = async (imdbID) => {
    setLoading(true);
    setError('');
    try {
      const details = await fetchMovieDetails(imdbID);
      setSelectedMovie(details);
      setNavStack(stack => [...stack, 'details']);
    } catch (e) {
      setError('Failed to fetch movie details.');
    }
    setLoading(false);
  };

  const handleBack = () => {
    // Go back one step in navStack
    setNavStack(stack => {
      if (stack.length <= 1) return ['home'];
      const newStack = stack.slice(0, -1);
      // If going back from details, clear selectedMovie
      if (stack[stack.length - 1] === 'details') setSelectedMovie(null);
      // If going back from search, clear movies
      if (stack[stack.length - 1] === 'search') setMovies([]);
      return newStack;
    });
    setError('');
  };

  const handleHome = () => {
    setMovies([]);
    setSelectedMovie(null);
    setError('');
    setSearchBarKey(prev => prev + 1); // force SearchBar to reset
    setNavStack(['home']);
  };

  return (
    <div className="app-container">
      <h1>Hotie Movies</h1>
      <p className="intro-text">
        Discover the latest and greatest movies by genre, or search for your favorites instantly! Dive in and explore a world of cinema—find your next movie night pick now.
      </p>
      <div className="search-controls">
        <SearchBar key={searchBarKey} onSearch={handleSearch} />
        <GenreDropdown onSelect={handleGenreSearch} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {navStack[navStack.length - 1] === 'home' ? (
        <GenreSections onSelect={handleSelectMovie} />
      ) : navStack[navStack.length - 1] === 'search' ? (
        <div className="search-results-wrapper">
          <button className="home-btn left" onClick={handleBack} title="Back" aria-label="Back">
            <span className="back-arrow" aria-hidden="true">&#8592;</span>
          </button>
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} onSelect={handleSelectMovie} />
            ))}
          </div>
        </div>
      ) : (
        <div className="home-btn-wrapper">
          <button className="home-btn left" onClick={handleBack} title="Back" aria-label="Back">
            <span className="back-arrow" aria-hidden="true">&#8592;</span>
          </button>
          <MovieDetails movie={selectedMovie} />
        </div>
      )}
    </div>
  );
}

export default App;
