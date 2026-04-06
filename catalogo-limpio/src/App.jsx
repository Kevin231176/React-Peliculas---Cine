import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [peliculas, setPeliculas] = useState([]);
/*   Uso de api */
 useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/movie/popular?api_key=${import.meta.env.VITE_API_TOKEN}`)
    .then(res => res.json())
    .then(data => {
      setPeliculas(data.results || []);
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div className="contenedor">
      <h1>ESTRENOS</h1>

      <div className="grid">
        {peliculas.map((peli) => (
          <Link
            to={`/pelicula/${peli.id}`}
            state={{ pelicula: peli }}
            className="card"
            key={peli.id}
          >
            {peli.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`}
                alt={peli.title}
              />
            )}
            <h3>{peli.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;