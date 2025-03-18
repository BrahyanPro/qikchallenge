import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieSuggestions from '../MovieSuggestions';

const mockSimilarMovies = [
  {
    id: 1,
    title: 'Similar Movie 1',
    poster_path: '/similar-movie-1.jpg',
    release_date: '2023-01-01',
    vote_average: 7.5,
    vote_count: 100,
    overview: 'Similar movie 1 description',
    original_language: 'en'
  },
  {
    id: 2,
    title: 'Similar Movie 2',
    poster_path: '/similar-movie-2.jpg',
    release_date: '2023-01-02',
    vote_average: 8.0,
    vote_count: 200,
    overview: 'Similar movie 2 description',
    original_language: 'es'
  }
];

const mockRecommendedMovies = [
  {
    id: 3,
    title: 'Recommended Movie 1',
    poster_path: '/recommended-movie-1.jpg',
    release_date: '2023-02-01',
    vote_average: 8.5,
    vote_count: 300,
    overview: 'Recommended movie 1 description',
    original_language: 'en'
  }
];

const mockRouter = {
  push: jest.fn()
};

jest.mock('expo-router', () => ({
  useRouter: jest.fn().mockReturnValue(mockRouter)
}));

describe('MovieSuggestions', () => {
  it('renders similar movies section when similar movies are provided', () => {
    const { getByText } = render(
      <MovieSuggestions similarMovies={mockSimilarMovies} recommendedMovies={[]} />
    );
    expect(getByText('🎬 Películas Similares')).toBeTruthy();
  });

  it('renders recommended movies section when recommended movies are provided', () => {
    const { getByText } = render(
      <MovieSuggestions similarMovies={[]} recommendedMovies={mockRecommendedMovies} />
    );
    expect(getByText('🌟 Recomendadas para Ti')).toBeTruthy();
  });

  it('does not render similar movies section when no similar movies are provided', () => {
    const { queryByText } = render(
      <MovieSuggestions similarMovies={[]} recommendedMovies={mockRecommendedMovies} />
    );
    expect(queryByText('🎬 Películas Similares')).toBeNull();
  });

  it('does not render recommended movies section when no recommended movies are provided', () => {
    const { queryByText } = render(
      <MovieSuggestions similarMovies={mockSimilarMovies} recommendedMovies={[]} />
    );
    expect(queryByText('🌟 Recomendadas para Ti')).toBeNull();
  });

  it('renders both sections when both similar and recommended movies are provided', () => {
    const { getByText } = render(
      <MovieSuggestions
        similarMovies={mockSimilarMovies}
        recommendedMovies={mockRecommendedMovies}
      />
    );
    expect(getByText('🎬 Películas Similares')).toBeTruthy();
    expect(getByText('🌟 Recomendadas para Ti')).toBeTruthy();
  });

  it('renders correct number of movie posters', () => {
    const { getAllByTestId } = render(
      <MovieSuggestions
        similarMovies={mockSimilarMovies}
        recommendedMovies={mockRecommendedMovies}
      />
    );
    const moviePosters = getAllByTestId(/movie-poster-/); // Usando testID con expresión regular

    expect(moviePosters.length).toBe(mockSimilarMovies.length + mockRecommendedMovies.length);
  });
});
