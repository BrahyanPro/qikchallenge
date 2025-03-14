import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import MovieDetail from '@/components/MovieDetail';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const movieId = Number(id);
  const { data: movie, isLoading } = useMovieDetails(movieId);

  return (
    <SafeAreaView className='flex-1 bg-gray-900'>
      <MovieDetail movie={isLoading ? undefined : movie} />
    </SafeAreaView>
  );
}
