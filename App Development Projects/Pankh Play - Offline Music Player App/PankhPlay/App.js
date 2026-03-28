import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '@/navigation/AppNavigator';
import TrackPlayer from 'react-native-track-player';

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      try {
        await TrackPlayer.setupPlayer();
        setIsPlayerReady(true);
      } catch (e) {
        console.log("Error setting up player", e);
        // Sometimes it is already initialized in development reloads
        setIsPlayerReady(true);
      }
    }
    setup();
  }, []);

  if (!isPlayerReady) {
    return null; // Could return a cool loading screen here
  }
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
