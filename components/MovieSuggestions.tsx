import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { Movie } from '@/types/Movies';
import { useRouter } from 'expo-router';

interface MovieSuggestionsProps {
  similarMovies?: Movie[];
  recommendedMovies?: Movie[];
}

export default function MovieSuggestions({
  similarMovies,
  recommendedMovies
}: MovieSuggestionsProps) {
  const router = useRouter();

  return (
    <View className='mt-6'>
      {/* Películas Similares */}
      {similarMovies && similarMovies.length > 0 && (
        <View className='mb-6'>
          <Text className='text-white text-xl font-bold mb-3'>🎬 Películas Similares</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {similarMovies.map(movie => (
              <Pressable key={movie.id} onPress={() => router.push(`/movie/${movie.id}`)}>
                <Image
                  testID={`movie-poster-${movie.id}`}
                  source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                  className='w-32 h-48 rounded-lg mr-3'
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Películas Recomendadas */}
      {recommendedMovies && recommendedMovies.length > 0 && (
        <View>
          <Text className='text-white text-xl font-bold mb-3'>🌟 Recomendadas para Ti</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendedMovies.map(movie => (
              <Pressable key={movie.id} onPress={() => router.push(`/movie/${movie.id}`)}>
                <Image
                  testID={`movie-poster-${movie.id}`}
                  source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                  className='w-32 h-48 rounded-lg mr-3'
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
