import { MovieDetails } from '@/types/MovieDetails';
import { Movie, MovieRating } from '@/types/Movies';
import { get, post } from './apiUtils';

//Podria hacer una clase, pero es mejor asi siuuuuuuuuuuuuuuuuuuuuuuuu, es mas estetico la verdad y más facil de leer

// Obtener películas en cartelera
export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const data = await get<{ results: Movie[] }>('movie/now_playing', { page: '1' });
  return data?.results.sort((a, b) => a.title.localeCompare(b.title)) || [];
};

// Obtener detalles de una película
export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const data = await get<MovieDetails>(`movie/${movieId}`, { append_to_response: 'credits' });
    if (!data) {
      throw new Error('No se pudo obtener los detalles de la película.');
    }
    return data;
  } catch (error) {
    throw new Error(`Error al obtener los detalles de la película: ${error}`);
  }
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

export const getUserRating = async (movieId: number, sessionId: string) => {
  //https://api.themoviedb.org/3/guest_session/{guest_session_id}/rated/movies
  const data = await get<{ results: MovieRating[] }>(`guest_session/${sessionId}/rated/movies`);
  const movieRating = data?.results?.find((movie: { id: number }) => movie.id === movieId);
  return movieRating?.rating || null;
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
