# CineScope — Movie Discovery App

A responsive React movie discovery application built for the Full Stack Developer Evaluation. It uses The Movie Database (TMDB) API for movie discovery, search, details, cast and videos.

## Features

- Popular, Top Rated, Now Playing and Upcoming movie sections
- Movie search with pagination
- Movie details page with poster, backdrop, overview, rating, runtime, genres, language, production companies and cast
- Trailer/video support when TMDB provides one
- Favorites/watchlist stored in localStorage
- Responsive desktop/tablet/mobile UI
- Loading, empty, API-error and invalid-movie states
- Client-side routing with React Router
- Reusable movie cards and section components

## Setup

1. Install Node.js 18+.
2. Create a TMDB account and obtain the API credentials required for your application.
3. Copy `.env.example` to `.env`.
4. Put your TMDB API Read Access Token in `.env`:

```env
VITE_TMDB_TOKEN=your_token_here
```

5. Install and run:

```bash
npm install
npm run dev
```

6. Build for production:

```bash
npm run build
npm run preview
```

## Deployment

This project works well with Vercel, Netlify, Cloudflare Pages, GitHub Pages (with SPA routing configuration), or similar frontend hosting.

For Vercel/Netlify, add `VITE_TMDB_TOKEN` as an environment variable in the deployment settings.

## Important credential note

Vite environment variables prefixed with `VITE_` are included in the browser bundle. For a production application where the TMDB credential must remain private, use a server-side proxy/serverless function instead. The supplied assignment explicitly allows direct frontend calls, subject to TMDB's current API requirements.

## Project structure

```text
src/
  components/
    Header.jsx
    MovieCard.jsx
    MovieGrid.jsx
    MovieSection.jsx
    Spinner.jsx
  pages/
    Home.jsx
    Search.jsx
    MovieDetails.jsx
    Favorites.jsx
    NotFound.jsx
  services/
    tmdb.js
  hooks/
    useFavorites.js
  App.jsx
  main.jsx
  styles.css
```

## Assignment coverage

The implementation covers the required movie list, categories, search, pagination, routing, movie details, responsive UI, API integration, loading/error/empty states and maintainable component structure.
