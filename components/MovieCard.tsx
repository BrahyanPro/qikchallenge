import { View, Text, Image } from 'react-native';
import { Movie } from '@/types/Movies';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <View className='mb-6 px-4'>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        className='w-full h-80 rounded-xl'
      />
      <Text className='text-white text-lg font-bold mt-2'>{movie.title}</Text>
      <Text className='text-gray-400'>🗓 {movie.release_date}</Text>
      <Text className='text-yellow-400'>⭐ {movie.vote_average.toFixed(1)}</Text>
    </View>
  );
}
