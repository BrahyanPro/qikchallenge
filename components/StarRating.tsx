import { View, Pressable } from 'react-native';
import { useState } from 'react';
import { Star } from 'lucide-react-native';

interface StarRatingProps {
  onRate: (rating: number) => void;
}

export default function StarRating({ onRate }: StarRatingProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRating = (rating: number) => {
    setSelectedRating(rating);
    onRate(rating);
  };

  return (
    <View className='flex-row justify-center mt-4'>
      {[1, 2, 3, 4, 5].map(star => (
        <Pressable key={star} onPress={() => handleRating(star)}>
          <Star
            size={32}
            color={star <= (selectedRating ?? 0) ? '#FFD700' : '#666'}
            fill={star <= (selectedRating ?? 0) ? '#FFD700' : 'none'}
            className='mx-1'
          />
        </Pressable>
      ))}
    </View>
  );
}
