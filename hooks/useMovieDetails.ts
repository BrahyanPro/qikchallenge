import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '@/lib/movieApi';
import { MovieDetails } from '@/types/MovieDetails';

// Custom hook para obtener los detalles de la película
export const useMovieDetails = (movieId: number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ['movieDetails', movieId],
    queryFn: () => getMovieDetails(movieId)
  });
};
