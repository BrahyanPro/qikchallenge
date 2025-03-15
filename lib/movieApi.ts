import { MovieDetails } from '@/types/MovieDetails';
import { Movie } from '@/types/Movies';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY || '';

// Construcción de URL sin agregar API Key innecesaria
const buildUrl = (endpoint: string, params: Record<string, string> = {}) => {
  const urlParams = new URLSearchParams(params);
  return `${API_URL}/${endpoint}?${urlParams.toString()}`;
};

// Función `GET` reutilizable
const get = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  const url = buildUrl(endpoint, { api_key: API_KEY, ...params });

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

  return response.json();
};

// Función `POST` sin API Key en la URL
const post = async <T>(
  endpoint: string,
  body?: object,
  params: Record<string, string> = {}
): Promise<T> => {
  const url = buildUrl(endpoint, params);

  console.log('URL:', url);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(`Error ${response.status}: ${data.status_message}`);

  return data;
};

// Obtener películas en cartelera
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const data = await get<{ results: Movie[] }>('movie/now_playing', { page: '1' });
  return data.results;
};

// Obtener detalles de una película
export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  return get<MovieDetails>(`movie/${movieId}`, { append_to_response: 'credits' });
};

// Obtener sesión de invitado (necesaria para votar)
export const getGuestSession = async (): Promise<string> => {
  const data = await get<{ guest_session_id: string }>('authentication/guest_session/new');
  return data.guest_session_id;
};

// Enviar calificación de película
export const rateMovie = async (
  movieId: number,
  rating: number,
  sessionId: string
): Promise<void> => {
  await post(
    `movie/${movieId}/rating`,
    { value: rating },
    { guest_session_id: sessionId, api_key: API_KEY }
  );
};

// Obtener películas similares
export const getSimilarMovies = async (movieId: number): Promise<Movie[]> => {
  const data = await get<{ results: Movie[] }>(`movie/${movieId}/similar`, { page: '1' });
  return data.results;
};

// Obtener películas recomendadas
export const getRecommendedMovies = async (movieId: number): Promise<Movie[]> => {
  const data = await get<{ results: Movie[] }>(`movie/${movieId}/recommendations`, { page: '1' });
  return data.results;
};
