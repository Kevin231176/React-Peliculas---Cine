import React from "react";
import Comida from "./Comida.jsx";


import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Detalle from "./Detalle.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/comida" element={<Comida />} />
      <Route path="/" element={<App />} />
      <Route path="/pelicula/:id" element={<Detalle />} />
    </Routes>
  </BrowserRouter>
);