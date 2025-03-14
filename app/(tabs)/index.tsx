import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useNowPlayingMovies } from '@/hooks/useNowPlayingMovies';
import MovieCard from '@/components/MovieCard';

export default function NowPlayingScreen() {
  const { data, isLoading } = useNowPlayingMovies();

  if (isLoading) {
    return (
      <SafeAreaView className='flex-1 items-center justify-center bg-gray-900'>
        <ActivityIndicator size='large' color='#ffffff' />
        <Text className='text-white mt-4'>Cargando películas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-900'>
      <View className='p-4'>
        <Text className='text-white text-2xl font-bold mb-4'>🎬 En Cartelera</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </SafeAreaView>
  );
}
