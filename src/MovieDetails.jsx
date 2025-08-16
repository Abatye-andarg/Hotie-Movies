import React from 'react';

function MovieDetails({ movie, onBack }) {
  if (!movie) return null;
  return (
    <div className="movie-details">
  {/* Back button removed; handled globally by the left arrow */}
      <div className="details-content">
        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'} alt={movie.Title} />
        <div className="details-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          {movie.WatchLink && (
            <p><strong>Where to Watch:</strong> <a href={movie.WatchLink} target="_blank" rel="noopener noreferrer" style={{color:'#ffb400',textDecoration:'underline'}}>Official Streaming Options</a></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
