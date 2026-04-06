import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IMG_W500 } from "../../services/api";
import SeatMap from "../../components/SeatMap/SeatMap";
import "./MovieDetail.css";

function MovieDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pelicula = state?.pelicula;

  const PRECIO = 10000;

  const [seleccionados, setSeleccionados] = useState([]);
  const [confirmados, setConfirmados] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!pelicula) {
    return (
      <div className="detail-empty page-content">
        <span className="detail-empty__icon">🎬</span>
        <h2>No hay datos de la película</h2>
        <p>Regresa al catálogo para seleccionar una película.</p>
        <button className="detail-empty__btn" onClick={() => navigate("/")}>
          ← Volver al catálogo
        </button>
      </div>
    );
  }

  const toggleAsiento = (i) => {
    if (confirmados.includes(i)) return;

    if (seleccionados.includes(i)) {
      setSeleccionados(seleccionados.filter((a) => a !== i));
    } else {
      setSeleccionados([...seleccionados, i]);
    }
  };

  const quitarUltimo = () => {
    if (seleccionados.length === 0) return;
    const nuevos = [...seleccionados];
    nuevos.pop();
    setSeleccionados(nuevos);
  };

  const pagar = () => {
    if (seleccionados.length === 0) return;
    setConfirmados([...confirmados, ...seleccionados]);
    setSeleccionados([]);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const cantidad = seleccionados.length;
  const total = cantidad * PRECIO;

  return (
    <div className="detail page-content">
      {/* Confirmation toast */}
      {showConfirmation && (
        <div className="detail__toast">
          ✅ ¡Compra realizada con éxito!
        </div>
      )}

      {/* Left: Movie Info */}
      <aside className="detail__info">
        <button className="detail__back" onClick={() => navigate("/")}>
          ← Catálogo
        </button>
        <div className="detail__poster">
          <img
            src={`${IMG_W500}${pelicula.poster_path}`}
            alt={pelicula.title}
          />
        </div>
        <h1 className="detail__title">{pelicula.title}</h1>
        {pelicula.vote_average && (
          <div className="detail__rating">
            <span className="detail__rating-star">★</span>
            {pelicula.vote_average.toFixed(1)}
          </div>
        )}
        <p className="detail__overview">{pelicula.overview}</p>
      </aside>

      {/* Center: Seat Map */}
      <main className="detail__center">
        <h2 className="detail__section-title">Selecciona tus asientos</h2>
        <SeatMap
          seleccionados={seleccionados}
          confirmados={confirmados}
          onToggle={toggleAsiento}
        />
      </main>

      {/* Right: Control Panel */}
      <aside className="detail__control">
        {/* Summary card */}
        <div className="detail__summary">
          <h3 className="detail__summary-title">Resumen</h3>
          <div className="detail__summary-row">
            <span>Sillas</span>
            <span className="detail__summary-value">{cantidad}</span>
          </div>
          <div className="detail__summary-row">
            <span>Precio/silla</span>
            <span className="detail__summary-value">$10.000</span>
          </div>
          <div className="detail__summary-divider" />
          <div className="detail__summary-row detail__summary-total">
            <span>Total</span>
            <span className="detail__summary-value">
              ${total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Counter */}
        <div className="detail__panel">
          <h3 className="detail__panel-title">Entradas</h3>
          <div className="detail__counter">
            <button
              className="detail__counter-btn"
              onClick={quitarUltimo}
              aria-label="Quitar asiento"
            >
              −
            </button>
            <span className="detail__counter-value">{cantidad}</span>
            <button
              className="detail__counter-btn"
              onClick={() => {/* solo por mapa */}}
              disabled
              aria-label="Selecciona en el mapa"
            >
              +
            </button>
          </div>
          <p className="detail__panel-hint">Selecciona asientos en el mapa</p>
        </div>

        {/* Actions */}
        <div className="detail__actions">
          <button
            className="detail__btn-combos"
            onClick={() => navigate("/combos")}
          >
            🍿 Ver combos
          </button>
          <button
            className="detail__btn-pay"
            onClick={pagar}
            disabled={cantidad === 0}
          >
            Pagar ${total.toLocaleString()}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default MovieDetail;
