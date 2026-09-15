import { useEffect, useState } from "react";

const KEY = "cinescope-favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.some((movie) => movie.id === id);

  const toggleFavorite = (movie) => {
    setFavorites((current) =>
      isFavorite(movie.id)
        ? current.filter((item) => item.id !== movie.id)
        : [movie, ...current]
    );
  };

  return { favorites, isFavorite, toggleFavorite };
}