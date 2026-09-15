import React from "react";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart, Star, Clock, Play } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import useFavorites from "../hooks/useFavorites";
import { backdropUrl, getMovieDetails, posterUrl } from "../services/tmdb";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    setError("");
    getMovieDetails(id)
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-box full"><Spinner /></div>;

  if (error || !movie) {
    return (
      <div className="container page">
        <div className="state-card error">
          <h2>Movie not found</h2>
          <p>{error || "This movie could not be loaded."}</p>
          <Link className="btn" to="/">Back Home</Link>
        </div>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const year = movie.release_date?.slice(0, 4) || "N/A";

  return (
    <div>
      <section
        className="detail-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(7,8,13,.98), rgba(7,8,13,.8), rgba(7,8,13,.45)), url(${backdropUrl(movie.backdrop_path)})`
        }}
      >
        <div className="container detail-layout">
          <div className="detail-poster">
            {movie.poster_path ? <img src={posterUrl(movie.poster_path, "w780")} alt={movie.title} /> : <div className="poster-fallback">No Poster</div>}
          </div>

          <div className="detail-content">
            <Link to="/" className="back-link"><ArrowLeft size={17} /> Back</Link>
            <span className="eyebrow">MOVIE DETAILS</span>
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}

            <div className="facts">
              <span><Star size={16} fill="currentColor" /> {movie.vote_average?.toFixed(1)}/10</span>
              <span>{year}</span>
              {movie.runtime && <span><Clock size={16} /> {movie.runtime} min</span>}
              <span>{movie.original_language?.toUpperCase()}</span>
            </div>

            <div className="genre-list">
              {movie.genres?.map((genre) => <span key={genre.id}>{genre.name}</span>)}
            </div>

            <p className="overview">{movie.overview || "No overview is available for this movie."}</p>

            <div className="hero-actions">
              <button className="btn primary" onClick={() => toggleFavorite(movie)}>
                <Heart size={17} fill={isFavorite(movie.id) ? "currentColor" : "none"} />
                {isFavorite(movie.id) ? "Remove Favorite" : "Add to Favorites"}
              </button>
              {trailer && (
                <a
                  className="btn ghost"
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Play size={17} fill="currentColor" /> Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container detail-extra">
        {movie.production_companies?.length > 0 && (
          <section className="info-panel">
            <h2>Production</h2>
            <div className="production-list">
              {movie.production_companies.map((company) => (
                <span key={company.id}>{company.name}</span>
              ))}
            </div>
          </section>
        )}

        {movie.credits?.cast?.length > 0 && (
          <section className="info-panel">
            <h2>Cast</h2>
            <div className="cast-grid">
              {movie.credits.cast.slice(0, 12).map((person) => (
                <div className="cast-card" key={person.id}>
                  {person.profile_path ? (
                    <img src={posterUrl(person.profile_path, "w185")} alt={person.name} />
                  ) : (
                    <div className="cast-placeholder">{person.name.charAt(0)}</div>
                  )}
                  <strong>{person.name}</strong>
                  <small>{person.character || "Cast"}</small>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}