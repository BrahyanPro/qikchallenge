import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '@/lib/movieApi';
import { MovieDetails } from '@/types/MovieDetails';

export const useMovieDetails = (movieId: number) => {
  return useQuery<MovieDetails>({
    queryKey: ['movieDetails', movieId],
    queryFn: () => getMovieDetails(movieId)
  });
};
