import { useQuery } from '@tanstack/react-query';
import { getSimilarMovies, getRecommendedMovies } from '@/lib/movieApi';
import { Movie } from '@/types/Movies';

export const useMovieSuggestions = (movieId: number | undefined) => {
  if (!movieId) {
    return {
      similarMovies: undefined,
      recommendedMovies: undefined,
      isLoading: false
    };
  }

  const { data: similarMovies, isLoading: loadingSimilar } = useQuery<Movie[]>({
    queryKey: ['similarMovies', movieId],
    queryFn: () => getSimilarMovies(movieId)
  });

  const { data: recommendedMovies, isLoading: loadingRecommended } = useQuery<Movie[]>({
    queryKey: ['recommendedMovies', movieId],
    queryFn: () => getRecommendedMovies(movieId)
  });

  return {
    similarMovies,
    recommendedMovies,
    isLoading: loadingSimilar || loadingRecommended
  };
};
