import React from "react";
import { Search, Film, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const value = query.trim();
    if (value) navigate(`/search?q=${encodeURIComponent(value)}`);
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-icon"><Film size={21} /></span>
          <span>CineScope</span>
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/favorites"><Heart size={17} /> Favorites</Link>
        </nav>

        <form className="search-form" onSubmit={submit}>
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            aria-label="Search movies"
          />
        </form>
      </div>
    </header>
  );
}