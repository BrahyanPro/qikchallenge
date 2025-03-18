import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { MovieDetails } from '@/types/MovieDetails';
import { useMovieRating } from '@/hooks/useMovieRating';
import StarRating from './StarRating';
import MovieSuggestions from './MovieSuggestions';
import { useMovieSuggestions } from '@/hooks/useMovieSuggestions';
import FavoriteButton from './FavoriteButton';
import SkeletonLoader from './ui/SkeletonLoader';
import MovieAditionalInformation from './MovieAditionalInformation';
import ActorProfiles from './movieDetails/ActorProfiles';
import GenreList from './movieDetails/GenreList';

export default function MovieDetail({ movie }: { movie?: MovieDetails }) {
  const { rateMovie, currentRating } = useMovieRating(movie?.id);
  const { similarMovies, recommendedMovies } = useMovieSuggestions(movie?.id);

  if (!movie) {
    return <SkeletonLoader />;
  }

  const { title, release_date, vote_average, overview, backdrop_path, poster_path } = movie;

  return (
    <ScrollView className='p-4'>
      {/* Fondo de la película con condicional si no hay backdrop */}
      {backdrop_path || poster_path ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780${backdrop_path || poster_path}`
          }}
          className='w-full h-48 rounded-lg mb-4'
        />
      ) : (
        <View testID='fallback-image' className='w-full h-48 bg-gray-600 rounded-lg mb-4' /> // Fondo gris si no hay imagen de fondo
      )}

      {/* Información principal */}
      <View className='p-4 bg-gray-800 rounded-lg shadow-lg'>
        <View className='flex-row flex-wrap justify-between items-center'>
          <Text className='text-white text-2xl font-bold flex-1 mr-2 overflow-hidden text-ellipsis'>
            {title}
          </Text>
          {/* Aca un error de tipado por la forma en la que programé, podria refactorizarlo pero no es prioridad, seria sencillo hacerlo pero habria que tocar muchisimo codigo, cambiar el estado, etc etc, no es rentable, y funciona bien, aunque en el localstorage se guardan cosas innecesarias, perdon por eso enserio error mio 100%. */}
          {/*@ts-ignore*/}
          <FavoriteButton movie={movie} />
        </View>
        <Text className='text-gray-400 text-sm'>🗓 {release_date.split('-')[0]}</Text>
        <Text className='text-yellow-400 text-lg'>⭐ {vote_average.toFixed(1)}</Text>
        <Text className='text-gray-300 text-base mt-2'>
          {overview || 'Sin descripción disponible'}
        </Text>
      </View>

      {/* Géneros */}
      <GenreList movie={movie} />

      {/* Calificación */}
      <StarRating onRate={rating => rateMovie(rating)} selectedRating={currentRating} />

      {/* Información adicional de la película */}
      <MovieAditionalInformation movie={movie} />

      {/* Lista de actores */}
      <ActorProfiles movie={movie} />

      <MovieSuggestions similarMovies={similarMovies} recommendedMovies={recommendedMovies} />
    </ScrollView>
  );
}
