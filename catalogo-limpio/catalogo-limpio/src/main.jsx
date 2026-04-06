import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Combos from "./pages/Combos/Combos";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pelicula/:id" element={<MovieDetail />} />
        <Route path="/combos" element={<Combos />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);