import { MovieDetails } from '@/types/MovieDetails';
import { Movie } from '@/types/Movies';
import { get, post } from './apiUtils';

// Obtener películas en cartelera
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const data = await get<{ results: Movie[] }>('movie/now_playing', { page: '1' });
  return data?.results || [];
};

// Obtener detalles de una película
export const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
  const data = await get<MovieDetails>(`movie/${movieId}`, { append_to_response: 'credits' });
  return data || null;
};

// Obtener sesión de invitado (necesaria para votar)
export const getGuestSession = async (): Promise<string | null> => {
  const data = await get<{ guest_session_id: string }>('authentication/guest_session/new');
  return data?.guest_session_id || null;
};

// Enviar calificación de película
export const rateMovie = async (
  movieId: number,
  rating: number,
  sessionId: string
): Promise<void> => {
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY || '';
  await post(
    `movie/${movieId}/rating`,
    { value: rating },
    { guest_session_id: sessionId, api_key: API_KEY }
  );
};

// Obtener películas similares
export const getSimilarMovies = async (movieId: number): Promise<Movie[]> => {
  const data = await get<{ results: Movie[] }>(`movie/${movieId}/similar`, { page: '1' });
  return data?.results || [];
};

// Obtener películas recomendadas
export const getRecommendedMovies = async (movieId: number): Promise<Movie[]> => {
  const data = await get<{ results: Movie[] }>(`movie/${movieId}/recommendations`, { page: '1' });
  return data?.results || [];
};
