import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useRouter } from 'expo-router';

export default function FavoritesScreen() {
  const { favorites } = useFavoritesStore();
  const router = useRouter();

  return (
    <SafeAreaView className='flex-1 bg-gray-900 p-4'>
      <Text className='text-white text-3xl font-bold'>❤️ Mis Favoritos</Text>
      {favorites.length === 0 ? (
        <Text className='text-gray-400 mt-6'>Aún no has añadido películas a favoritos.</Text>
      ) : (
        <ScrollView className='mt-6'>
          {favorites.map(movie => (
            <Pressable
              key={movie.id}
              onPress={() => router.push(`/movie/${movie.id}`)}
              className='mb-4'
            >
              <View className='flex-row items-center bg-gray-800 p-3 rounded-lg'>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w92${movie.poster_path}` }}
                  className='w-16 h-24 rounded-lg'
                />
                <View className='ml-4'>
                  <Text className='text-white text-lg font-bold'>{movie.title}</Text>
                  <Text className='text-gray-400 text-sm'>⭐ {movie.vote_average.toFixed(1)}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
