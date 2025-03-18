import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rateMovie, getMovieDetails, getUserRating } from '@/lib/movieApi';
import { useState, useEffect } from 'react';
import { useGuestSession } from './useGuestSession';

export const useMovieRating = (movieId: number | undefined) => {
  if (!movieId) {
    return {
      rateMovie: (_rating: number) => {},
      currentRating: null as number | null,
      isLoading: false
    };
  }

  const { guestSessionId } = useGuestSession();
  const [currentRating, setCurrentRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchPersonalMovieRating = async () => {
      try {
        // Obtener la calificación del usuario
        if (guestSessionId) {
          const userRating = await getUserRating(movieId, guestSessionId);
          setCurrentRating(userRating !== null ? userRating : 0);
        } else {
          setCurrentRating(0);
        }
      } catch (error) {
        console.error('Error fetching movie details and rating:', error);
      }
    };

    if (guestSessionId) {
      fetchPersonalMovieRating();
    }
  }, [movieId, guestSessionId]);

  const mutation = useMutation({
    mutationFn: (rating: number) => {
      if (!guestSessionId) throw new Error('No session ID available');
      return rateMovie(movieId, rating, guestSessionId);
    },
    onSuccess: (_data, variables) => setCurrentRating(variables) // Actualiza la calificación después de calificar
  });

  return {
    rateMovie: mutation.mutate,
    currentRating,
    isLoading: mutation.isPending
  };
};
