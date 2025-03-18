import { View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react-native';

interface StarRatingProps {
  onRate: (rating: number) => void;
  selectedRating?: number | null; // Recibe la calificación seleccionada previamente
}

export default function StarRating({ onRate, selectedRating }: StarRatingProps) {
  const [selected, setSelected] = useState<number | null>(selectedRating || null);

  useEffect(() => {
    setSelected(selectedRating || null);
  }, [selectedRating]);

  const handleRating = (rating: number) => {
    setSelected(rating);
    onRate(rating);
  };

  return (
    <View className='flex-row justify-center mt-4'>
      {[1, 2, 3, 4, 5].map(star => (
        <Pressable key={star} onPress={() => handleRating(star)}>
          <Star
            size={32}
            color={star <= (selected ?? 0) ? '#FFD700' : '#666'}
            fill={star <= (selected ?? 0) ? '#FFD700' : 'none'}
            className='mx-1'
          />
        </Pressable>
      ))}
    </View>
  );
}
