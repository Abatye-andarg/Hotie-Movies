
# Hotie Movies

Hotie Movies is a modern, interactive movie browsing web app built with React and Vite. It allows users to:

- Browse recent movies by genre
- Search for movies by title
- Search for movies by genre
- View detailed information about each movie

All movie data is fetched from the TMDb API.

## How It Works

1. **Homepage**: Shows recent movies grouped by genre.
2. **Search Bar**: Type a movie name to search instantly.
3. **Genre Dropdown**: Select a genre to see movies from that genre.
4. **Movie Details**: Click any movie card to see more info.

## How to Run Locally

1. **Clone or download this repository.**
2. **Install dependencies:**
	```bash
	npm install
	```
3. **Set up your TMDb API key:**
	- Create a `.env` file in the project root (if not present).
	- Add this line (replace with your TMDb API key):
	  ```
	  VITE_TMDB_API_KEY=your_tmdb_api_key_here
	  ```
4. **Start the development server:**
	```bash
	npm run dev
	```
5. **Open your browser to** `http://localhost:5173` (or the port shown in your terminal).

## File Order to Review the Code

1. `src/App.jsx` - Main app logic, layout, and state
2. `src/SearchBar.jsx` - Search input component
3. `src/GenreDropdown.jsx` - Genre dropdown for searching by genre
4. `src/GenreSections.jsx` - Displays recent movies by genre on homepage
5. `src/MovieCard.jsx` - Movie card UI for grid display
6. `src/MovieDetails.jsx` - Movie details popup/page
7. `src/api.js` - Movie search/detail API functions (TMDb)
8. `src/genreApi.js` - Genre and genre-movie API functions (TMDb)
9. `src/App.css` - All main styles
10. `src/assets/no-image.svg` - Placeholder for missing movie posters

## Notes

- You must have a TMDb API key to use this app. Get one for free at [themoviedb.org](https://www.themoviedb.org/).
- This project uses only React, JavaScript, and pure CSS (no UI frameworks).
- For production, build with `npm run build` and deploy the `dist` folder.
