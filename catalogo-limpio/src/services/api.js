const API_KEY = import.meta.env.VITE_API_KEY;
console.log("API KEY:", API_KEY);
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`
    );

    if (!response.ok) {
      throw new Error("Error al obtener películas");
    }

    const data = await response.json();
    return data.results;

  } catch (error) {
    console.error(error);
    return [];
  }
};