import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=29f0fef95da5c251e115c89b1a5a259b")
      .then(res => res.json())
      .then(data => {
        setPeliculas(data.results || []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="contenedor">
      <h1>Películas</h1>

      <div className="grid">
        {peliculas.map((peli) => (
          <div className="card" key={peli.id}>
            {peli.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`}
                alt={peli.title}
              />
            )}
            <h3>{peli.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;