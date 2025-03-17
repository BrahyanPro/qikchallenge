import { View, Text } from 'react-native';

const SkeletonLoader = () => {
  return (
    <View className='p-4 bg-gray-800 rounded-lg animate-pulse'>
      <View className='h-56 bg-gray-600 rounded-lg mb-4' />
      <Text className='h-6 bg-gray-600 rounded w-1/2 mb-2' />
      <Text className='h-6 bg-gray-600 rounded w-1/4 mb-2' />
      <Text className='h-4 bg-gray-600 rounded w-3/4 mb-2' />
    </View>
  );
};

export default SkeletonLoader;
