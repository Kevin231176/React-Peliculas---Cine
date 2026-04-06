import "./SkeletonLoader.css";

function SkeletonLoader({ count = 8 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div
          className="skeleton-card"
          key={i}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="skeleton-card__poster" />
          <div className="skeleton-card__info">
            <div className="skeleton-card__title" />
            <div className="skeleton-card__year" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
