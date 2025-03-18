import { View, Text, Image, ScrollView } from 'react-native';
import { User } from 'lucide-react-native';
import { MovieDetails } from '@/types/MovieDetails';

interface ActorProfileProps {
  actor: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  };
}

const ActorProfile = ({ actor }: ActorProfileProps) => {
  return (
    <View className='items-center mx-2'>
      {actor.profile_path ? (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w185${actor.profile_path}` }}
          className='w-32 h-32 rounded-full shadow-xl border-4 border-gray-700'
        />
      ) : (
        <View className='w-32 h-32 rounded-full bg-gradient-to-r from-gray-600 to-blue-400 flex justify-center items-center shadow-lg'>
          <User size={40} color='#fff' />
        </View>
      )}
      <Text className='text-white text-sm font-bold mt-2'>{actor.name}</Text>
      <Text className='text-gray-400 text-xs'>{actor.character}</Text>
    </View>
  );
};

const ActorProfiles = ({ movie }: { movie: MovieDetails }) => {
  return (
    <>
      {movie.credits?.cast.length > 0 ? (
        <>
          <Text className='text-white text-xl font-bold mt-6'>🎭 Actores</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-4'>
            {movie.credits.cast.slice(0, 10).map(actor => (
              <ActorProfile key={actor.id} actor={actor} />
            ))}
          </ScrollView>
        </>
      ) : (
        <Text className='text-gray-400 text-sm mt-4'>
          No se encontraron actores para esta película.
        </Text>
      )}
    </>
  );
};

export default ActorProfiles;
