import { Movie } from '@/types/Movies';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const fetchFromMovieDB = async (endpoint: string, params: Record<string, string> = {}) => {
  const urlParams = new URLSearchParams({
    api_key: API_KEY!,
    language: 'es',
    ...params
  });

  const url = `${API_URL}/${endpoint}?${urlParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

  return response.json();
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const data = await fetchFromMovieDB('movie/now_playing', { page: '1' });
  return data.results;
};
