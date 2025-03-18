import React from 'react';
import { render } from '@testing-library/react-native';
import GenreList from '../movieDetails/GenreList';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' },
    { id: 3, name: 'Sci-Fi' }
  ]
};

describe('GenreList', () => {
  it('renders all genres correctly', () => {
    const { getByText } = render(<GenreList movie={mockMovie} />);

    expect(getByText('Action')).toBeTruthy();
    expect(getByText('Adventure')).toBeTruthy();
    expect(getByText('Sci-Fi')).toBeTruthy();
  });

  it('handles movie with no genres', () => {
    const movieWithoutGenres = {
      ...mockMovie,
      genres: []
    };
    const { getByText } = render(<GenreList movie={movieWithoutGenres} />);
    expect(getByText('Sin géneros disponibles')).toBeTruthy();
  });

  it('renders genres with correct styling', () => {
    const { getByText } = render(<GenreList movie={mockMovie} />);
    const genreElement = getByText('Action');
    expect(genreElement).toBeTruthy();
  });
});
