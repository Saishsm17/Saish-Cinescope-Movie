import { Heart } from "lucide-react";
import MovieGrid from "../components/MovieGrid";
import useFavorites from "../hooks/useFavorites";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="container page">
      <div className="page-heading">
        <span className="eyebrow">YOUR LIST</span>
        <h1>Favorites</h1>
        <p>Movies you saved are stored locally in this browser.</p>
      </div>

      {favorites.length ? (
        <MovieGrid
          movies={favorites}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <div className="state-card">
          <Heart size={35} />
          <h2>Your favorites are empty</h2>
          <p>Save movies from the home page or a movie details page.</p>
        </div>
      )}
    </div>
  );
}