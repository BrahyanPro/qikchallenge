import { Pressable, Text } from 'react-native';
import { useFavoritesStore } from '@/store/favoritesStore';
import { Movie } from '@/types/Movies';
import { Heart } from 'lucide-react-native';

interface FavoriteButtonProps {
  movie: Movie;
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Pressable
      onPress={toggleFavorite}
      className='flex-row items-center p-2 bg-gray-800 rounded-lg'
    >
      <Heart
        size={24}
        color={isFavorite ? '#ff5252' : '#fff'}
        fill={isFavorite ? '#ff5252' : 'none'}
      />
      <Text className='text-white ml-2'>{isFavorite ? 'Quitar' : 'Añadir'}</Text>
    </Pressable>
  );
}
