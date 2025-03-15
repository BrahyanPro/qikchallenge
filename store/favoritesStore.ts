import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '@/types/Movies';

interface FavoritesStore {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  loadFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>(set => ({
  favorites: [],

  addFavorite: async movie => {
    set(state => {
      const updatedFavorites = [...state.favorites, movie];
      AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  removeFavorite: async movieId => {
    set(state => {
      const updatedFavorites = state.favorites.filter(m => m.id !== movieId);
      AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  loadFavorites: async () => {
    const savedFavorites = await AsyncStorage.getItem('favorites');
    if (savedFavorites) {
      set({ favorites: JSON.parse(savedFavorites) });
    }
  }
}));
