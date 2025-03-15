import { View, Text, Image, Pressable } from 'react-native';
import { Movie } from '@/types/Movies';
import { useRouter } from 'expo-router';
import FavoriteButton from './FavoriteButton';

export default function MovieCard({ movie }: { movie: Movie }) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/movie/${movie.id}`)}>
      <View className='mb-6 px-4'>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          className='w-full h-80 rounded-xl'
        />
        <View className='absolute top-2 right-2'>
          <FavoriteButton movie={movie} />
        </View>
        <Text className='text-white text-lg font-bold mt-2'>{movie.title}</Text>
        <Text className='text-gray-400'>🗓 {movie.release_date}</Text>
        <Text className='text-yellow-400'>⭐ {movie.vote_average.toFixed(1)}</Text>
      </View>
    </Pressable>
  );
}
