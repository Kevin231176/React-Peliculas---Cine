const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL || "https://api.themoviedb.org/3";

/** Filtra películas que no tienen sinopsis traducida */
const filterTranslated = (movies) =>
  movies.filter((m) => m.overview && m.overview.trim().length > 0 && m.title);

/**
 * Obtiene las películas populares
 */
export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`
    );

    if (!response.ok) {
      throw new Error("Error al obtener películas populares");
    }

    const data = await response.json();
    return filterTranslated(data.results);
  } catch (error) {
    console.error("getPopularMovies:", error);
    return [];
  }
};

/**
 * Obtiene detalles de una película por ID
 */
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`
    );

    if (!response.ok) {
      throw new Error(`Error al obtener detalles de película ${movieId}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getMovieDetails:", error);
    return null;
  }
};

/**
 * Busca películas por término de búsqueda
 */
export const searchMovies = async (query) => {
  if (!query || query.trim().length === 0) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Error al buscar películas");
    }

    const data = await response.json();
    return filterTranslated(data.results);
  } catch (error) {
    console.error("searchMovies:", error);
    return [];
  }
};

/** URL base para imágenes de TMDB */
export const IMG_BASE = "https://image.tmdb.org/t/p";
export const IMG_W500 = `${IMG_BASE}/w500`;
export const IMG_ORIGINAL = `${IMG_BASE}/original`;