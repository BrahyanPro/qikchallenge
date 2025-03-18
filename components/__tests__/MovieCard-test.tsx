import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import MovieCard from '../MovieCard';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn()
}));

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient'
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn().mockResolvedValue(null)
}));

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  release_date: '2023-01-01',
  vote_average: 7.5,
  vote_count: 100,
  overview: 'Test movie description',
  poster_path: '/test-poster.jpg',
  original_language: 'en'
};

describe('MovieCard', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to movie detail screen when pressed', () => {
    const { getByTestId } = render(<MovieCard movie={mockMovie} />);

    // Verifica que se navegue correctamente al presionar la tarjeta
    fireEvent.press(getByTestId('movie-card-pressable'));
    expect(mockRouter.push).toHaveBeenCalledWith('/movie/1');
  });

  it('renders poster image with correct URI', () => {
    const { getByTestId } = render(<MovieCard movie={mockMovie} />);
    const posterImage = getByTestId('movie-poster-image');

    // Verifica que la URI de la imagen esté correctamente configurada
    expect(posterImage.props.source.uri).toBe('https://image.tmdb.org/t/p/w500/test-poster.jpg');
  });
});
