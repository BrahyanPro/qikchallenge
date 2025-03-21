import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import 'react-native-reanimated';

import './global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ animation: 'fade' }}>
          <Stack.Screen name='(tabs)' options={{ headerShown: false, title: 'Inicio' }} />
          <Stack.Screen name='movie/[id]' options={{ title: 'Detalles de Película' }} />
          <Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar style='auto' />
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
