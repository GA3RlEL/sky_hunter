import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" />
      <Stack.Screen name="Flights" />
      <Stack.Screen name="Favourites" />
      <Stack.Screen name="Profile" />
    </Stack>
  );
}