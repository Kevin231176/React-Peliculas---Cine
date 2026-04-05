import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Detalle.css";

function Detalle() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const pelicula = state?.pelicula;

  const PRECIO = 10000;

  const [cantidad, setCantidad] = useState(0);
  const [seleccionados, setSeleccionados] = useState([]);
  const [confirmados, setConfirmados] = useState([]);

  if (!pelicula) return <p>No hay datos</p>;

  const toggleAsiento = (i) => {
    if (confirmados.includes(i)) return;

    if (seleccionados.includes(i)) {
      const nuevos = seleccionados.filter(a => a !== i);
      setSeleccionados(nuevos);
      setCantidad(nuevos.length);
    } else {
      const nuevos = [...seleccionados, i];
      setSeleccionados(nuevos);
      setCantidad(nuevos.length);
    }
  };

  const quitarUltimo = () => {
    if (seleccionados.length === 0) return;
    const nuevos = [...seleccionados];
    nuevos.pop();
    setSeleccionados(nuevos);
    setCantidad(nuevos.length);
  };

  const pagar = () => {
    setConfirmados([...confirmados, ...seleccionados]);
    setSeleccionados([]);
    setCantidad(0);
  };

  const total = cantidad * PRECIO;

  return (
    <div className="detalle">

      {/* IZQUIERDA */}
      <div className="info">
        <img
          src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
          alt={pelicula.title}
        />
        <h1>{pelicula.title}</h1>
        <p>{pelicula.overview}</p>
      </div>

      {/* CENTRO */}
      <div className="sala-container">
        <div className="pantalla">PANTALLA</div>

        <div className="sala">
          {Array.from({ length: 40 }).map((_, i) => {
            const esPasillo = i % 8 === 4;
            const esSeleccionado = seleccionados.includes(i);
            const esConfirmado = confirmados.includes(i);

            return (
              <div
                key={i}
                className={`asiento 
                  ${esPasillo ? "pasillo" : ""} 
                  ${esSeleccionado ? "seleccionado" : ""} 
                  ${esConfirmado ? "ocupado" : ""}`}
                onClick={() => !esPasillo && toggleAsiento(i)}
              ></div>
            );
          })}
        </div>

        <div className="entrada">ENTRADA</div>
      </div>

      {/* DERECHA */}
      <div className="control">

        {/* CUADRO BLANCO */}
        <div className="resumen">
          <p>Sillas: <span className="rojo">{cantidad}</span></p>
          <p>Precio por silla: <span className="rojo">$10.000</span></p>
          <p>Total: <span className="rojo">${total.toLocaleString()}</span></p>
        </div>

        {/* PANEL */}
        <div className="panel">
          <h2>Entradas</h2>

          <div className="contador">
            <button onClick={quitarUltimo}>-</button>
            <span>{cantidad}</span>
            <button onClick={() => setCantidad(cantidad + 1)}>+</button>
          </div>

          <button className="comida" onClick={() => navigate("/comida")}>
            🍿 Ver combos
          </button>
        </div>

        {/* BOTÓN ABAJO */}
        <button className="pagar" onClick={pagar}>
          Pagar
        </button>

      </div>
    </div>
  );
}

export default Detalle;