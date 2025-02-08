import React from 'react';
import { SafeAreaView } from 'react-native';
import Login from './(auth)/login'; // Adjust the import path as needed
import { Stack } from 'expo-router';

export default function App() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
    </Stack>
  );
}