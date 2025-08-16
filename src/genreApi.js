
// Fetch genres and movies by genre from TMDb
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  return data.genres || [];
}

export async function fetchRecentMoviesByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=release_date.desc&primary_release_date.lte=${new Date().toISOString().slice(0,10)}`);
  const data = await res.json();
  if (!data.results) return [];
  return data.results.map(movie => ({
    imdbID: movie.id,
    Title: movie.title,
    Year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
    Poster: movie.poster_path ? IMAGE_BASE + movie.poster_path : null,
  }));
}
