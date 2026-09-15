const BASE_URL = "https://api.themoviedb.org/3";

function getToken() {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) {
    throw new Error("TMDB token is missing. Add VITE_TMDB_TOKEN to your .env file.");
  }
  return token;
}

async function request(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json;charset=utf-8"
    }
  });

  if (!response.ok) {
    let message = `TMDB request failed (${response.status})`;
    try {
      const data = await response.json();
      message = data.status_message || message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
}

export const IMAGE_BASE = "https://image.tmdb.org/t/p/";

export function posterUrl(path, size = "w500") {
  return path ? `${IMAGE_BASE}${size}${path}` : null;
}

export function backdropUrl(path, size = "original") {
  return path ? `${IMAGE_BASE}${size}${path}` : null;
}

export const getPopular = (page = 1) =>
  request("/movie/popular", { language: "en-US", page });

export const getTopRated = (page = 1) =>
  request("/movie/top_rated", { language: "en-US", page });

export const getNowPlaying = (page = 1) =>
  request("/movie/now_playing", { language: "en-US", page });

export const getUpcoming = (page = 1) =>
  request("/movie/upcoming", { language: "en-US", page });

export const searchMovies = (query, page = 1) =>
  request("/search/movie", {
    query,
    include_adult: false,
    language: "en-US",
    page
  });

export const getMovieDetails = (id) =>
  request(`/movie/${id}`, {
    language: "en-US",
    append_to_response: "credits,videos"
  });