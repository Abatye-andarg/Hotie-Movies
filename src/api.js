
// Utility for fetching movies from TMDb API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export async function fetchMovies(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!data.results) return [];
  // Map TMDb results to a format similar to OMDb
  return data.results.map(movie => ({
    imdbID: movie.id,
    Title: movie.title,
    Year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
    Poster: movie.poster_path ? IMAGE_BASE + movie.poster_path : null,
  }));
}

export async function fetchMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const movie = await res.json();

  // Fetch watch providers
  let watchLink = null;
  try {
    const provRes = await fetch(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`);
    const provData = await provRes.json();
    // Try to get a link for your country, fallback to US, then global
    const country = 'US';
    if (provData.results && provData.results[country] && provData.results[country].link) {
      watchLink = provData.results[country].link;
    } else if (provData.results && provData.results['US'] && provData.results['US'].link) {
      watchLink = provData.results['US'].link;
    } else if (provData.results && Object.values(provData.results)[0]?.link) {
      watchLink = Object.values(provData.results)[0].link;
    }
  } catch (e) {
    // ignore
  }

  return {
    Title: movie.title,
    Year: movie.release_date ? movie.release_date.slice(0, 4) : 'N/A',
    Poster: movie.poster_path ? IMAGE_BASE + movie.poster_path : 'https://via.placeholder.com/200x300?text=No+Image',
    Genre: movie.genres ? movie.genres.map(g => g.name).join(', ') : 'N/A',
    Director: 'N/A', // TMDb does not provide director in this endpoint
    Actors: 'N/A', // TMDb does not provide actors in this endpoint
    Plot: movie.overview || 'N/A',
    imdbRating: movie.vote_average ? movie.vote_average.toString() : 'N/A',
    WatchLink: watchLink,
  };
}
