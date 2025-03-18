import { View, Text, Image, Pressable } from 'react-native';
import { Movie } from '@/types/Movies';
import { useRouter } from 'expo-router';
import FavoriteButton from './FavoriteButton';
import { LinearGradient } from 'expo-linear-gradient';

export default function MovieCard({ movie }: { movie: Movie }) {
  const router = useRouter();

  // Función para formatear la fecha de forma legible
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Pressable
      onPress={() => router.push(`/movie/${movie.id}`)}
      className='mb-6 mx-4'
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10
      }}
    >
      <View className='rounded-2xl overflow-hidden bg-gray-950'>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          className='w-full h-96 rounded-t-2xl'
          resizeMode='cover'
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          className='absolute bottom-0 left-0 right-0 h-1/2 rounded-b-2xl'
        />
        <View className='absolute top-3 right-3 z-10'>
          <FavoriteButton movie={movie} />
        </View>

        <View className='p-4 pb-5'>
          <Text className='text-white text-xl font-bold' numberOfLines={1}>
            {movie.title}
          </Text>

          <View className='mt-2 space-y-2'>
            {/* Fecha de estreno */}
            <View className='flex-row items-center'>
              <Text className='text-blue-400 mr-2'>🗓</Text>
              <Text className='text-gray-300 text-sm'>{formatDate(movie.release_date)}</Text>
            </View>

            {/* Valoración */}
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center'>
                <Text className='text-yellow-400 mr-2'>⭐</Text>
                <Text className='text-gray-300 text-sm'>
                  {movie.vote_average.toFixed(1)} ({movie.vote_count} votos)
                </Text>
              </View>

              <View className='bg-blue-900/50 px-3 py-1 rounded-full'>
                <Text className='text-blue-200 text-xs font-medium'>
                  {movie.original_language.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Overview/sinopsis (limitada) */}
            <Text className='text-gray-400 text-xs mt-1' numberOfLines={2}>
              {movie.overview}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
