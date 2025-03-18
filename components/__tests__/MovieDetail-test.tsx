import { render, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieDetail from '../MovieDetail';

// Mock de las dependencias
jest.mock('@/hooks/useMovieRating', () => ({
  useMovieRating: () => ({
    rateMovie: jest.fn(),
    currentRating: 3
  })
}));

jest.mock('@/hooks/useMovieSuggestions', () => ({
  useMovieSuggestions: () => ({
    similarMovies: [],
    recommendedMovies: []
  })
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
  overview: 'Test movie description',
  backdrop_path: '/test-backdrop.jpg',
  poster_path: '/test-poster.jpg',
  genres: [{ id: 1, name: 'Action' }],
  runtime: 120,
  production_countries: [{ name: 'United States' }],
  spoken_languages: [{ english_name: 'English' }],
  credits: {
    cast: [
      {
        id: 1,
        name: 'Test Actor',
        character: 'Test Character',
        profile_path: '/test-profile.jpg'
      }
    ]
  }
};

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('MovieDetail', () => {
  it('renders fallback view when no backdrop/poster image', () => {
    const movieWithoutImages = { ...mockMovie, backdrop_path: null, poster_path: null };
    const { getByTestId } = render(<MovieDetail movie={movieWithoutImages} />, { wrapper });

    // Verificar que se muestre el fallback de la imagen
    expect(getByTestId('fallback-image')).toBeTruthy();
  });

  it('renders movie genre list correctly', () => {
    const { getByText } = render(<MovieDetail movie={mockMovie} />, { wrapper });
    expect(getByText('Action')).toBeTruthy();
  });

  it('displays actor profiles correctly', () => {
    const { getByText } = render(<MovieDetail movie={mockMovie} />, { wrapper });
    expect(getByText('Test Actor')).toBeTruthy();
    expect(getByText('Test Character')).toBeTruthy();
  });
});
