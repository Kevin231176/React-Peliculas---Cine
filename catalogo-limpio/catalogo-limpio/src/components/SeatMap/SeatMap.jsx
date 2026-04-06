import "./SeatMap.css";

function SeatMap({ seleccionados, confirmados, onToggle }) {
  return (
    <div className="seatmap">
      <div className="seatmap__screen">
        <div className="seatmap__screen-surface">PANTALLA</div>
        <div className="seatmap__screen-glow" />
      </div>

      <div className="seatmap__grid">
        {Array.from({ length: 40 }).map((_, i) => {
          const esPasillo = i % 8 === 4;
          const esSeleccionado = seleccionados.includes(i);
          const esConfirmado = confirmados.includes(i);

          return (
            <button
              key={i}
              type="button"
              className={`seatmap__seat
                ${esPasillo ? "seatmap__seat--aisle" : ""}
                ${esSeleccionado ? "seatmap__seat--selected" : ""}
                ${esConfirmado ? "seatmap__seat--occupied" : ""}`}
              onClick={() => !esPasillo && onToggle(i)}
              disabled={esPasillo || esConfirmado}
              aria-label={
                esPasillo
                  ? "Pasillo"
                  : esConfirmado
                  ? `Asiento ${i + 1} ocupado`
                  : esSeleccionado
                  ? `Asiento ${i + 1} seleccionado`
                  : `Asiento ${i + 1} libre`
              }
            />
          );
        })}
      </div>

      <div className="seatmap__entrance">ENTRADA</div>

      {/* Legend */}
      <div className="seatmap__legend">
        <div className="seatmap__legend-item">
          <span className="seatmap__legend-dot seatmap__legend-dot--free" />
          <span>Libre</span>
        </div>
        <div className="seatmap__legend-item">
          <span className="seatmap__legend-dot seatmap__legend-dot--selected" />
          <span>Seleccionado</span>
        </div>
        <div className="seatmap__legend-item">
          <span className="seatmap__legend-dot seatmap__legend-dot--occupied" />
          <span>Ocupado</span>
        </div>
      </div>
    </div>
  );
}

export default SeatMap;
