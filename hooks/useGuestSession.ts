import { useQuery } from '@tanstack/react-query';
import { getGuestSession } from '@/lib/movieApi';

export const useGuestSession = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['guestSession'],
    queryFn: getGuestSession,
    staleTime: 1000 * 60 * 60 * 24, // Mantiene la sesión durante un día, es lo que dura el expire_at, TODO: Poner especifcamente el tiempo de expire at, no un día pero por ahora funciona correctamente mvp.
    refetchOnWindowFocus: false,
    retry: 1
  });

  return {
    guestSessionId: data,
    isLoading,
    isError
  };
};
