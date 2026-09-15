import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import Spinner from "../components/Spinner";
import useFavorites from "../hooks/useFavorites";
import { searchMovies } from "../services/tmdb";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q")?.trim() || "";
  const page = Number(params.get("page") || 1);
  const { favorites, toggleFavorite } = useFavorites();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setResult(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    searchMovies(query, page)
      .then((data) => !cancelled && setResult(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [query, page]);

  function goPage(nextPage) {
    setParams({ q: query, page: String(nextPage) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container page">
      <div className="page-heading">
        <span className="eyebrow">DISCOVER</span>
        <h1>{query ? `Search results for “${query}”` : "Search movies"}</h1>
      </div>

      {!query ? (
        <div className="state-card">
          <p>Enter a movie title in the search bar above.</p>
        </div>
      ) : loading ? (
        <div className="loading-box large"><Spinner /></div>
      ) : error ? (
        <div className="state-card error">
          <p>{error}</p>
          <button className="btn" onClick={() => goPage(page)}>Retry</button>
        </div>
      ) : result?.results?.length ? (
        <>
          <MovieGrid
            movies={result.results}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
          <div className="pagination">
            <button className="btn" disabled={page <= 1} onClick={() => goPage(page - 1)}>← Previous</button>
            <span>Page {page} of {Math.min(result.total_pages || 1, 500)}</span>
            <button className="btn" disabled={page >= Math.min(result.total_pages || 1, 500)} onClick={() => goPage(page + 1)}>Next →</button>
          </div>
        </>
      ) : (
        <div className="state-card">
          <p>No movies found for “{query}”. Try another title.</p>
        </div>
      )}
    </div>
  );
}