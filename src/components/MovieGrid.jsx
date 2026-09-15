import React from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, favorites = [], onToggleFavorite }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          favorite={favorites.some((item) => item.id === movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}