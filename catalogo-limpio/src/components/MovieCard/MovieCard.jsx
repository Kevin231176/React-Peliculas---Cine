import { Link } from "react-router-dom";
import { IMG_W500 } from "../../services/api";
import "./MovieCard.css";

function MovieCard({ movie, index = 0 }) {
  const rating = movie.vote_average?.toFixed(1) || "N/A";

  return (
    <Link
      to={`/pelicula/${movie.id}`}
      state={{ pelicula: movie }}
      className="movie-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="movie-card__poster">
        {movie.poster_path ? (
          <img
            src={`${IMG_W500}${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="movie-card__no-poster">
            <span>🎬</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="movie-card__gradient" />

        {/* Rating badge */}
        <div className="movie-card__rating">
          <span className="movie-card__star">★</span>
          {rating}
        </div>

        {/* Hover info */}
        <div className="movie-card__overlay">
          <p className="movie-card__overview">
            {movie.overview
              ? movie.overview.substring(0, 120) + "..."
              : "Sin sinopsis disponible."}
          </p>
          <span className="movie-card__cta">Ver detalles →</span>
        </div>
      </div>

      <h3 className="movie-card__title">{movie.title}</h3>
      <span className="movie-card__year">
        {movie.release_date?.split("-")[0] || ""}
      </span>
    </Link>
  );
}

export default MovieCard;
