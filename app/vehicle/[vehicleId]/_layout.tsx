import { Stack } from 'expo-router';

export default function VehicleWorkspaceLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="timeline" options={{ headerShown: false }} />
      <Stack.Screen name="photos" options={{ headerShown: false }} />
      <Stack.Screen name="documents" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="activity/new" options={{ headerShown: false }} />
      <Stack.Screen name="activity/[activityId]" options={{ headerShown: false }} />
    </Stack>
  );
}
