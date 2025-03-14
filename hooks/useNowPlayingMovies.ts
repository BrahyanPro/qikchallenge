import { useQuery } from '@tanstack/react-query';
import { getNowPlayingMovies } from '@/lib/movieApi';

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ['nowPlaying'],
    queryFn: getNowPlayingMovies
  });
};
