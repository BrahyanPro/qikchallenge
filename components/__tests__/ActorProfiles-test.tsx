import React from 'react';
import { render } from '@testing-library/react-native';

import ActorProfiles from '../movieDetails/ActorProfiles';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  credits: {
    cast: [
      {
        id: 1,
        name: 'Actor 1',
        character: 'Character 1',
        profile_path: '/actor1-profile.jpg',
        adult: false,
        gender: 1,
        known_for_department: 'Acting',
        original_name: 'Actor One',
        popularity: 10,
        cast_id: 1,
        credit_id: 'credit1',
        order: 1
      },
      {
        id: 2,
        name: 'Actor 2',
        character: 'Character 2',
        profile_path: null,
        adult: false,
        gender: 2,
        known_for_department: 'Acting',
        original_name: 'Actor Two',
        popularity: 8,
        cast_id: 2,
        credit_id: 'credit2',
        order: 2
      }
    ]
  }
};

describe('ActorProfiles', () => {
  it('renders actor profiles correctly', () => {
    const { getByTestId } = render(<ActorProfiles movie={mockMovie} />);
    // Verifica que las imágenes de los actores estén correctamente renderizadas
    const actorImage = getByTestId('actor-image-1');
    expect(actorImage.props.source.uri).toBe('https://image.tmdb.org/t/p/w185/actor1-profile.jpg');
  });

  it('handles movie with no cast', () => {
    const movieWithoutCast = {
      ...mockMovie,
      credits: { cast: [] }
    };
    const { getByText } = render(<ActorProfiles movie={movieWithoutCast} />);
    expect(getByText('No se encontraron actores para esta película.')).toBeTruthy();
  });

  it('limits the number of displayed actors', () => {
    const movieWithManyCast = {
      ...mockMovie,
      credits: {
        cast: Array(15)
          .fill(null)
          .map((_, index) => ({
            id: index,
            name: `Actor ${index}`,
            character: `Character ${index}`,
            profile_path: null,
            adult: false,
            gender: 1,
            known_for_department: 'Acting',
            original_name: `Actor ${index}`,
            popularity: 5,
            cast_id: index,
            credit_id: `credit${index}`,
            order: index
          }))
      }
    };
    const { getAllByText } = render(<ActorProfiles movie={movieWithManyCast} />);
    const actorNames = getAllByText(/Actor \d+/);
    expect(actorNames.length).toBeLessThanOrEqual(10); // Verifica que se muestren un máximo de 10 actores
  });
});
