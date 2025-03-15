import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rateMovie, getGuestSession } from '@/lib/movieApi';
import { useEffect, useState } from 'react';

export const useMovieRating = (movieId: number) => {
  const queryClient = useQueryClient();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getGuestSession();
      setSessionId(session);
    };
    fetchSession();
  }, []);

  const mutation = useMutation({
    mutationFn: (rating: number) => rateMovie(movieId, rating, sessionId!),
    onSuccess: () => {
      queryClient.invalidateQueries(['movieDetails', movieId]);
    }
  });

  return { rateMovie: mutation.mutate, isLoading: mutation.isLoading };
};
