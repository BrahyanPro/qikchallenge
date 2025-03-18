import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import MovieDetail from '@/components/MovieDetail';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const movieId = Number(id);

  if (isNaN(movieId)) {
    return (
      <SafeAreaView className='flex-1 bg-gray-900 p-4'>
        <Text className='text-white'>Error: ID de película no válido</Text>
      </SafeAreaView>
    );
  }

  const { data: movie, isLoading } = useMovieDetails(movieId);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-900'>
      <MovieDetail movie={isLoading ? undefined : movie} />
    </SafeAreaView>
  );
}
