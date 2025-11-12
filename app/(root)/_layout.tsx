// app/(root)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

// Root stack layout defining the navigation structure for the app
export default function RootStack() {
  return (
    // Stack navigator manages navigation between top-level screens
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tabs group (main app navigation inside bottom tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Booking screen exists outside of the tabs navigation */}
      {/* Enables Stack to automatically display a back arrow when opened */}
      <Stack.Screen
        name="book/[id]"
        options={{
          headerShown: true,   // Show header for the booking screen
          title: "Book",       // Title text in the header
          headerBackTitle: "Back", // Label for the back button
        }}
      />
    </Stack>
  );
}
