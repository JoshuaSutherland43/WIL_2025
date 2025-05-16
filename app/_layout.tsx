/**
 * Main App Layout
 * Root component that wraps the entire application
 * Contains theme provider, authentication context, and global styling
 * 
 * TODO: Implement proper error boundary for crash protection
 * TODO: Add offline support for South African users in remote areas
 * TODO: Improve accessibility features for diverse user base
 * TODO: Implement analytics for usage patterns in South Africa
 * TODO: Add support for multiple languages common in South Africa
 */

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/contexts/AuthContext';

// TODO: Add performance monitoring for users with lower-end devices
// TODO: Implement proper deep linking for sharing South African trails

// Prevent the splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // TODO: Add fonts that support all South African languages
  });

  // Hide the splash screen after the fonts have loaded or error occurred
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // TODO: Add initialization for analytics and crash reporting
  // TODO: Add check for app updates

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      {/* TODO: Add network status provider for offline support */}
      {/* TODO: Add localization provider for multiple languages */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          {/* TODO: Add screens for South African-specific features */}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
