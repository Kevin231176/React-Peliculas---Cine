import { useEffect, useState } from "react";
import { getPopularMovies, IMG_ORIGINAL } from "../../services/api";
import MovieCard from "../../components/MovieCard/MovieCard";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPopularMovies();
        if (data && data.length > 0) {
          setHeroMovie(data[0]);
          setPeliculas(data);
        } else {
          setError("No se encontraron películas.");
        }
      } catch (err) {
        setError("Error al cargar las películas. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home page-content">
      {/* Hero Section */}
      {heroMovie && (
        <section className="home__hero">
          <div
            className="home__hero-bg"
            style={{
              backgroundImage: heroMovie.backdrop_path
                ? `url(${IMG_ORIGINAL}${heroMovie.backdrop_path})`
                : "none",
            }}
          />
          <div className="home__hero-overlay" />
          <div className="home__hero-content">
            <span className="home__hero-badge">🎬 Película Destacada</span>
            <h1 className="home__hero-title">{heroMovie.title}</h1>
            <p className="home__hero-overview">
              {heroMovie.overview
                ? heroMovie.overview.substring(0, 200) + "..."
                : ""}
            </p>
            <div className="home__hero-meta">
              {heroMovie.vote_average && (
                <span className="home__hero-rating">
                  ★ {heroMovie.vote_average.toFixed(1)}
                </span>
              )}
              {heroMovie.release_date && (
                <span className="home__hero-year">
                  {heroMovie.release_date.split("-")[0]}
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Search + Title */}
      <section className="home__catalog">
        <div className="home__catalog-header">
          <div className="home__title-group">
            <span className="home__title-accent" />
            <h2 className="home__title">Estrenos Populares</h2>
          </div>
          <SearchBar />
        </div>

        {/* Error state */}
        {error && (
          <div className="home__error">
            <span className="home__error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && <SkeletonLoader count={10} />}

        {/* Grid */}
        {!loading && !error && (
          <div className="home__grid">
            {peliculas.map((peli, index) => (
              <MovieCard key={peli.id} movie={peli} index={index} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
