import React from 'react';
import noImage from './assets/no-image.svg';

function MovieCard({ movie, onSelect }) {
  const posterSrc = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : noImage;
  return (
    <div className="movie-card" onClick={() => onSelect(movie.imdbID)}>
      <img src={posterSrc} alt={movie.Title} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
