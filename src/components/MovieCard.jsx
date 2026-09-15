import React from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { posterUrl } from "../services/tmdb";

export default function MovieCard({ movie, favorite = false, onToggleFavorite }) {
  const year = movie.release_date?.slice(0, 4) || "N/A";

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="poster-wrap">
        {movie.poster_path ? (
          <img
            src={posterUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            loading="lazy"
          />
        ) : (
          <div className="poster-fallback">No Poster</div>
        )}
        <div className="rating-badge">
          <Star size={13} fill="currentColor" /> {movie.vote_average?.toFixed(1) || "—"}
        </div>
      </Link>

      <div className="movie-card-body">
        <Link to={`/movie/${movie.id}`} className="movie-title">
          {movie.title}
        </Link>
        <div className="movie-meta">
          <span>{year}</span>
          {onToggleFavorite && (
            <button
              className={`favorite-btn ${favorite ? "active" : ""}`}
              onClick={() => onToggleFavorite(movie)}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart size={17} fill={favorite ? "currentColor" : "none"} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}