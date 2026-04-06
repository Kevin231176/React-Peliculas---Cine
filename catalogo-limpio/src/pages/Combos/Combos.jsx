import { useNavigate } from "react-router-dom";
import "./Combos.css";

const COMBOS = [
  {
    id: 1,
    emoji: "🍿",
    nombre: "Combo Clásico",
    descripcion: "Palomitas grandes + Gaseosa mediana",
    precio: 18000,
  },
  {
    id: 2,
    emoji: "🌮",
    nombre: "Combo Nachos",
    descripcion: "Nachos con queso + Bebida mediana",
    precio: 15000,
  },
  {
    id: 3,
    emoji: "🌭",
    nombre: "Combo Hot Dog",
    descripcion: "Hot dog clásico + Refresco mediano",
    precio: 16000,
  },
  {
    id: 4,
    emoji: "🍕",
    nombre: "Combo Pizza",
    descripcion: "Porción de pizza + Gaseosa grande",
    precio: 20000,
  },
  {
    id: 5,
    emoji: "🍫",
    nombre: "Combo Dulce",
    descripcion: "Chocolatina + Gomitas + Bebida pequeña",
    precio: 12000,
  },
  {
    id: 6,
    emoji: "👑",
    nombre: "Combo VIP",
    descripcion: "Palomitas XL + 2 Gaseosas + Nachos",
    precio: 35000,
  },
];

function Combos() {
  const navigate = useNavigate();

  return (
    <div className="combos page-content">
      <div className="combos__header">
        <button className="combos__back" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <div className="combos__title-group">
          <span className="combos__title-accent" />
          <h1 className="combos__title">Combos del Cine</h1>
        </div>
        <p className="combos__subtitle">
          Acompaña tu película con nuestros combos exclusivos
        </p>
      </div>

      <div className="combos__grid">
        {COMBOS.map((combo, index) => (
          <div
            className="combo-card"
            key={combo.id}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <span className="combo-card__emoji">{combo.emoji}</span>
            <h3 className="combo-card__name">{combo.nombre}</h3>
            <p className="combo-card__desc">{combo.descripcion}</p>
            <div className="combo-card__footer">
              <span className="combo-card__price">
                ${combo.precio.toLocaleString()}
              </span>
              <button className="combo-card__btn">Agregar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Combos;
