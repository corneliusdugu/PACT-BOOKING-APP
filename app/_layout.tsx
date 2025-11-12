// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import "./global.css";
import GlobalProvider from "../lib/global-provider";

// Root layout wrapping the entire application
export default function RootLayout() {
  return (
    // Wrap all screens in the GlobalProvider to supply global state/context
    <GlobalProvider>
      {/* Main navigation stack for the app; hides headers by default */}
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
