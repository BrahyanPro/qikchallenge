import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { MovieDetails } from '@/types/MovieDetails';

export default function MovieDetail({ movie }: { movie?: MovieDetails }) {
  if (!movie) {
    return (
      <View className='flex-1 items-center justify-center bg-gray-900'>
        <ActivityIndicator size='large' color='#ffffff' />
        <Text className='text-white mt-4'>Cargando detalles...</Text>
      </View>
    );
  }

  return (
    <ScrollView className='p-4'>
      {/* Fondo de la película */}
      {movie.backdrop_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` }}
          className='w-full h-56 rounded-lg mb-4'
        />
      )}

      {/* Información principal */}
      <View className='p-4 bg-gray-800 rounded-lg shadow-lg'>
        <Text className='text-white text-3xl font-bold'>{movie.title}</Text>
        <Text className='text-gray-400 text-lg'>🗓 {movie.release_date.split('-')[0]}</Text>
        <Text className='text-yellow-400 text-lg'>⭐ {movie.vote_average.toFixed(1)}</Text>
        <Text className='text-gray-300 text-lg mt-2'>{movie.overview}</Text>
      </View>

      {/* Géneros */}
      <View className='mt-4 flex-row flex-wrap'>
        {movie.genres.map(genre => (
          <View key={genre.id} className='bg-blue-600 px-3 py-1 rounded-full m-1 shadow'>
            <Text className='text-white text-sm'>{genre.name}</Text>
          </View>
        ))}
      </View>

      {/* Información extra */}
      <View className='mt-6 bg-gray-800 p-4 rounded-lg shadow-lg'>
        <Text className='text-white text-xl font-bold'>Información</Text>
        <Text className='text-gray-400'>⏳ Duración: {movie.runtime} min</Text>
        <Text className='text-gray-400'>
          🌎 País: {movie.production_countries.map(c => c.name).join(', ')}
        </Text>
        <Text className='text-gray-400'>
          🎤 Idioma: {movie.spoken_languages.map(l => l.english_name).join(', ')}
        </Text>
      </View>

      {/* Lista de actores */}
      <Text className='text-white text-2xl font-bold mt-6'>🎭 Actores</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-4'>
        {movie.credits?.cast.slice(0, 10).map(actor => (
          <View key={actor.id} className='items-center mx-2'>
            <Image
              source={{
                uri: actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : 'https://via.placeholder.com/185'
              }}
              className='w-24 h-24 rounded-full shadow-lg'
            />
            <Text className='text-white text-sm font-bold mt-2'>{actor.name}</Text>
            <Text className='text-gray-400 text-xs'>{actor.character}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
