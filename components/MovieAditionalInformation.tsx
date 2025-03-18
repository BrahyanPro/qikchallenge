import { View, Text } from 'react-native';
import { MovieDetails } from '@/types/MovieDetails';

const MovieAditionalInformation = ({ movie }: { movie: MovieDetails }) => {
  return (
    <View className='mt-6 bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col gap-2'>
      <Text className='text-white text-xl font-bold'>Información</Text>
      <Text className='text-gray-400'>
        ⏳ Duración: {movie.runtime ? `${movie.runtime} min` : 'N/A'}
      </Text>
      <Text className='text-gray-400'>
        🌎 País:{' '}
        {movie.production_countries.length
          ? movie.production_countries.map(c => c.name).join(', ')
          : 'No disponible'}
      </Text>
      <Text className='text-gray-400'>
        🎤 Idioma: movie
        {movie.spoken_languages.length
          ? movie.spoken_languages.map(l => l.english_name).join(', ')
          : 'No disponible'}
      </Text>
    </View>
  );
};

export default MovieAditionalInformation;
