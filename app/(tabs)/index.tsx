import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, ActivityIndicator, StatusBar, Platform } from 'react-native';
import { useNowPlayingMovies } from '@/hooks/useNowPlayingMovies';
import MovieCard from '@/components/MovieCard';
import { BlurView } from 'expo-blur';

export default function NowPlayingScreen() {
  const { data, isLoading } = useNowPlayingMovies();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#030712' }}
        edges={['top', 'right', 'left']}
      >
        <StatusBar barStyle='light-content' />
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color='#3B82F6' />
          <Text className='text-white text-base font-medium mt-4 tracking-wide'>
            Cargando películas...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#030712' }}
        edges={['top', 'right', 'left']}
      >
        {/* Header con BlurView */}
        <BlurView intensity={20} tint='dark' className='z-10'>
          <View className='py-4 px-6'>
            <Text className='text-white text-2xl font-bold tracking-tight'>
              En <Text className='text-blue-500'>Cartelera</Text>
            </Text>
          </View>
        </BlurView>

        {/* Lista de películas */}
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
          contentContainerStyle={{
            paddingBottom: 40
          }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
}
