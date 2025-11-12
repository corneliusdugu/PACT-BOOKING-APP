// app/sign-in.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";

// Sign-in screen providing a mock authentication flow
export default function Auth() {
  // Access global authentication state and actions
  const { loading, isLogged, signIn } = useGlobalContext();
  // Local state to manage login submission status
  const [submitting, setSubmitting] = React.useState(false);

  // Automatically redirect to main app tabs if user is already signed in
  React.useEffect(() => {
    if (!loading && isLogged) {
      router.replace("/(root)/(tabs)");
    }
  }, [loading, isLogged]);

  // Handle mock sign-in flow with loading and error handling
  const handleLogin = async () => {
    try {
      setSubmitting(true);
      await signIn(); // Trigger mock sign-in from global provider
      router.replace("/(root)/(tabs)"); // Redirect after successful login
    } catch (e: any) {
      Alert.alert("Sign in failed", e?.message ?? "Something went wrong"); // Show error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // SafeAreaView ensures layout fits properly on all devices
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* Centered scroll view for vertical alignment on different screen sizes */}
      <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1, justifyContent: "center" }}>
        <View style={{ alignItems: "center" }}>
          {/* App logo */}
          <Image
            source={require("../assets/images/pact-logo.jpeg")}
            style={{ width: 120, height: 120, borderRadius: 16, marginBottom: 24 }}
            resizeMode="contain"
          />

          {/* Welcome text and subheader */}
          <Text
            style={{
              fontSize: 14,
              textTransform: "uppercase",
              fontWeight: "600",
              color: "#475569",
            }}
          >
            Welcome To PACT Booking
          </Text>

          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: "#0f172a",
              textAlign: "center",
              marginTop: 6,
            }}
          >
            Let’s Get You Booked
          </Text>

          {/* Description text */}
          <Text
            style={{
              fontSize: 16,
              color: "#64748b",
              textAlign: "center",
              marginTop: 18,
            }}
          >
            Sign in to continue
          </Text>

          {/* Mock sign-in button */}
          <TouchableOpacity
            disabled={submitting}
            onPress={handleLogin}
            style={{
              backgroundColor: "#0b5cff",
              paddingVertical: 14,
              borderRadius: 999,
              marginTop: 20,
              width: "100%",
              alignItems: "center",
            }}
            activeOpacity={0.8}
          >
            {submitting ? (
              // Show spinner while sign-in request is in progress
              <ActivityIndicator color="#fff" />
            ) : (
              // Button label when ready to sign in
              <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "700" }}>
                Continue with Google
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
