import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rateMovie, getGuestSession, getMovieDetails, getUserRating } from '@/lib/movieApi';
import { useEffect, useState } from 'react';
import { useGuestSession } from './useGuestSession';

export const useMovieRating = (movieId: number | undefined) => {
  if (!movieId) {
    return {
      rateMovie: (_rating: number) => {},
      currentRating: null as number | null,
      isLoading: false
    };
  }

  const queryClient = useQueryClient();
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const { guestSessionId } = useGuestSession();

  // Obtener detalles de la película y la calificación personal del usuario
  useEffect(() => {
    const fetchMovieDetailsAndRating = async () => {
      try {
        // Obtener los detalles de la película
        const movieDetails = await getMovieDetails(movieId);
        // Si existe la sesión, obtener la calificación personal del usuario
        if (guestSessionId) {
          const userRating = await getUserRating(movieId, guestSessionId);
          if (userRating !== null) {
            setCurrentRating(userRating);
          } else if (movieDetails.vote_average) {
            setCurrentRating(movieDetails.vote_average); // Usar la calificación promedio si no hay calificación personal
          }
        }
      } catch (error) {
        console.error('Failed to fetch movie details and user rating:', error);
      }
    };
    if (guestSessionId) {
      fetchMovieDetailsAndRating();
    }
  }, [movieId, guestSessionId]);

  const mutation = useMutation({
    mutationFn: (rating: number) => {
      if (!guestSessionId) throw new Error('No session ID available');
      return rateMovie(movieId, rating, guestSessionId);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['movieDetails', movieId] });
      setCurrentRating(variables); // Actualizar la calificación cuando el usuario califica
    }
  });

  return {
    rateMovie: mutation.mutate,
    currentRating,
    isLoading: mutation.isPending // Cambié de isLoading a isPending
  };
};
