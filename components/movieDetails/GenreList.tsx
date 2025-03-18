import { View, Text } from 'react-native';
import { MovieDetails } from '@/types/MovieDetails';

const GenreList = ({ movie }: { movie: MovieDetails }) => {
  return (
    <>
      {movie.genres.length > 0 ? (
        <View className='mt-4 flex-row flex-wrap'>
          {movie.genres.map(genre => (
            <View key={genre.id} className='bg-blue-600 px-3 py-1 rounded-full m-1 shadow'>
              <Text className='text-white text-sm'>{genre.name}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text className='text-gray-400 text-sm mt-2'>Sin géneros disponibles</Text>
      )}
    </>
  );
};

export default GenreList;
