import { useQuery } from '@tanstack/react-query';
import { getGuestSession } from '@/lib/movieApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGuestSession = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['guestSession'],
    queryFn: async () => {
      const storedSessionId = await AsyncStorage.getItem('guest_session_id');
      if (storedSessionId) {
        return storedSessionId;
      }
      const session = await getGuestSession();
      if (!session) {
        throw new Error('No se pudo obtener una sesión de invitado.');
      }
      await AsyncStorage.setItem('guest_session_id', session);
      return session;
    },
    staleTime: 1000 * 60 * 60 * 24, // Mantener la sesión durante 24 horas
    gcTime: 1000 * 60 * 60 * 24, // Eliminar la sesión después de 24 horas que es lo que dura el expire_at de la sesión TODO: Poner directamente el expire_at que devuelve el endpoint, pero no creo que sea neceserario porque dura 24 horas igualmente.
    refetchOnWindowFocus: false,
    retry: 1
  });

  return {
    guestSessionId: data,
    isLoading,
    isError
  };
};
