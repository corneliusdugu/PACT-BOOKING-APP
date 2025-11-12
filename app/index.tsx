// app/index.tsx
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { router } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";

// Entry gate screen that decides whether to route to sign-in or main tabs
export default function IndexGate() {
  // Access global loading and authentication state
  const { loading, isLogged } = useGlobalContext();

  // Redirect based on authentication status once loading completes
  React.useEffect(() => {
    if (loading) return; // Wait until context finishes loading
    router.replace(isLogged ? "/(root)/(tabs)" : "/sign-in"); // Navigate accordingly
  }, [loading, isLogged]);

  // Display a centered loading spinner while the app determines navigation
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
}
