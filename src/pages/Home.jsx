import React from "react";
import { useEffect, useState } from "react";
import MovieSection from "../components/MovieSection";
import useFavorites from "../hooks/useFavorites";
import {
  getPopular,
  getTopRated,
  getNowPlaying,
  getUpcoming,
  backdropUrl,
  posterUrl
} from "../services/tmdb";
import { Link } from "react-router-dom";

export default function Home() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [data, setData] = useState({
    popular: [], topRated: [], nowPlaying: [], upcoming: []
  });
  const [loading, setLoading] = useState({
    popular: true, topRated: true, nowPlaying: true, upcoming: true
  });
  const [errors, setErrors] = useState({});
  const [hero, setHero] = useState(null);

  async function loadSection(key, fn) {
    setLoading((s) => ({ ...s, [key]: true }));
    setErrors((s) => ({ ...s, [key]: "" }));
    try {
      const result = await fn();
      setData((s) => ({ ...s, [key]: result.results || [] }));
      if (key === "popular" && result.results?.length) {
        setHero(result.results[0]);
      }
    } catch (err) {
      setErrors((s) => ({ ...s, [key]: err.message }));
    } finally {
      setLoading((s) => ({ ...s, [key]: false }));
    }
  }

  useEffect(() => {
    loadSection("popular", getPopular);
    loadSection("topRated", getTopRated);
    loadSection("nowPlaying", getNowPlaying);
    loadSection("upcoming", getUpcoming);
  }, []);

  return (
    <div>
      {hero && (
        <section
          className="hero"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(7,8,13,.96) 0%, rgba(7,8,13,.72) 48%, rgba(7,8,13,.18) 100%), url(${backdropUrl(hero.backdrop_path)})` }}
        >
          <div className="hero-content">
            <span className="eyebrow">FEATURED MOVIE</span>
            <h1>{hero.title}</h1>
            <p>{hero.overview || "Discover your next favorite movie."}</p>
            <div className="hero-actions">
              <Link className="btn primary" to={`/movie/${hero.id}`}>View Details</Link>
              <button className="btn ghost" onClick={() => toggleFavorite(hero)}>
                {isFavorite(hero.id) ? "♥ In Favorites" : "♡ Add to Favorites"}
              </button>
            </div>
          </div>
        </section>
      )}

      <div className="container">
        <MovieSection
          title="Popular Movies"
          movies={data.popular.slice(0, 8)}
          loading={loading.popular}
          error={errors.popular}
          onRetry={() => loadSection("popular", getPopular)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <MovieSection
          title="Top Rated"
          movies={data.topRated.slice(0, 8)}
          loading={loading.topRated}
          error={errors.topRated}
          onRetry={() => loadSection("topRated", getTopRated)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <MovieSection
          title="Now Playing"
          movies={data.nowPlaying.slice(0, 8)}
          loading={loading.nowPlaying}
          error={errors.nowPlaying}
          onRetry={() => loadSection("nowPlaying", getNowPlaying)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <MovieSection
          title="Upcoming"
          movies={data.upcoming.slice(0, 8)}
          loading={loading.upcoming}
          error={errors.upcoming}
          onRetry={() => loadSection("upcoming", getUpcoming)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}