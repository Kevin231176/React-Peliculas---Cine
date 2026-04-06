import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">🎬</span>
          <span className="header__logo-text">Cine Picotero</span>
        </Link>

        <nav className="header__nav">
          <Link
            to="/"
            className={`header__link ${isActive("/") ? "header__link--active" : ""}`}
          >
            Inicio
          </Link>
          <Link
            to="/combos"
            className={`header__link ${isActive("/combos") ? "header__link--active" : ""}`}
          >
            🍿 Combos
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
