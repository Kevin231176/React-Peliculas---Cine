import { useState, useEffect, useRef } from "react";
import { searchMovies } from "../../services/api";
import { Link } from "react-router-dom";
import { IMG_W500 } from "../../services/api";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      const data = await searchMovies(query);
      setResults(data.slice(0, 6));
      setIsOpen(true);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <div className="search-bar__input-wrapper">
        <span className="search-bar__icon">🔍</span>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Buscar películas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        {isLoading && <span className="search-bar__spinner" />}
        {query && !isLoading && (
          <button
            className="search-bar__clear"
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
            }}
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-bar__dropdown">
          {results.map((movie) => (
            <Link
              to={`/pelicula/${movie.id}`}
              state={{ pelicula: movie }}
              className="search-bar__result"
              key={movie.id}
              onClick={handleResultClick}
            >
              {movie.poster_path ? (
                <img
                  src={`${IMG_W500}${movie.poster_path}`}
                  alt={movie.title}
                  className="search-bar__result-img"
                />
              ) : (
                <div className="search-bar__result-img search-bar__result-placeholder">
                  🎬
                </div>
              )}
              <div className="search-bar__result-info">
                <span className="search-bar__result-title">{movie.title}</span>
                <span className="search-bar__result-year">
                  {movie.release_date?.split("-")[0] || ""}
                  {movie.vote_average ? ` · ★ ${movie.vote_average.toFixed(1)}` : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim().length >= 2 && results.length === 0 && !isLoading && (
        <div className="search-bar__dropdown">
          <div className="search-bar__no-results">
            No se encontraron películas para "{query}"
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
