import React from "react";
import { Link } from "react-router-dom";
import MovieGrid from "./MovieGrid";
import Spinner from "./Spinner";

export default function MovieSection({
  title,
  movies,
  loading,
  error,
  onRetry,
  favorites,
  onToggleFavorite,
  link
}) {
  return (
    <section className="section">
      <div className="section-heading">
        <h2>{title}</h2>
        {link && <Link to={link}>View all →</Link>}
      </div>

      {loading ? (
        <div className="loading-box"><Spinner /></div>
      ) : error ? (
        <div className="state-card">
          <p>{error}</p>
          <button onClick={onRetry} className="btn">Retry</button>
        </div>
      ) : (
        <MovieGrid
          movies={movies}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </section>
  );
}