import { renderHook, waitFor } from '@testing-library/react-native';
import { useMovieDetails } from '../useMovieDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock de la API
jest.mock('@/lib/movieApi', () => ({
  getMovieDetails: jest.fn(() =>
    Promise.resolve({
      id: 1,
      title: 'Test Movie',
      overview: 'This is a test movie',
      release_date: '2023-01-01'
    })
  )
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useMovieDetails', () => {
  it('should fetch movie details and return the correct data', async () => {
    const { result } = renderHook(() => useMovieDetails(1), { wrapper });

    // Esperamos que el hook haya terminado de cargar los datos
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Comprobamos que la data obtenida es correcta
    expect(result.current.data).toEqual({
      id: 1,
      title: 'Test Movie',
      overview: 'This is a test movie',
      release_date: '2023-01-01'
    });
  });
});
