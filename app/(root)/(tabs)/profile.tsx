// app/(root)/(tabs)/profile.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { useGlobalContext } from "@/lib/global-provider";
import { listBookingsByUser, getFacilityById } from "@/lib/mock-api";
import type { Booking, Facility } from "@/lib/types";

// Define an extended booking type that includes the facility name
type BookingWithFacility = Booking & { facilityName: string };

// Profile screen component showing user's bookings and sign-out option
export default function Profile() {
  // Access user and signOut function from global context
  const { user, signOut } = useGlobalContext();
  // Retrieve URL params (used for displaying a confirmation banner after booking)
  const params = useLocalSearchParams<{ justBooked?: string }>();

  // State for loading indicator and list of bookings
  const [loading, setLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState<BookingWithFacility[]>([]);

  // Function to load bookings for the current user
  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      // If no user is signed in, clear bookings
      if (!user) {
        setBookings([]);
        return;
      }

      // Fetch all bookings for the user
      const bs: Booking[] = await listBookingsByUser(user.$id);

      // For each booking, fetch the facility name (if available)
      const withNames: BookingWithFacility[] = await Promise.all(
        bs.map(async (b) => {
          let facilityName = b.facility;
          try {
            const f: Facility | undefined = await getFacilityById(b.facility);
            if (f?.name) facilityName = f.name;
          } catch {}
          return { ...b, facilityName };
        })
      );

      // Sort bookings by start date (newest first)
      withNames.sort(
        (a, b) => new Date(b.startAt).getTime() - new Date(a.startAt).getTime()
      );

      // Update state with processed bookings
      setBookings(withNames);
    } finally {
      // Stop the loading spinner
      setLoading(false);
    }
  }, [user]);

  // Reload bookings each time the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [load])
  );

  // Handle user sign-out and redirect to sign-in page
  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  // Determine if user has just completed a booking (to show banner)
  const justBooked = params.justBooked === "1";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {/* Header section with title and sign-out button */}
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text style={{ fontSize: 28, fontWeight: "800", color: "#0f172a" }}>My Bookings</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={{ color: "#ef4444", fontWeight: "700" }}>Sign out</Text>
          </TouchableOpacity>
        </View>

        {/* Success banner displayed when a booking was just made */}
        {justBooked && (
          <View
            style={{
              backgroundColor: "#e6f4ff",
              borderColor: "#bfdbfe",
              borderWidth: 1,
              padding: 12,
              borderRadius: 10,
              marginTop: 12,
            }}
          >
            <Text style={{ color: "#1e3a8a", fontWeight: "700" }}>Booking confirmed</Text>
            <Text style={{ color: "#1e3a8a" }}>
              Your latest booking has been added below.
            </Text>
          </View>
        )}

        {/* Conditional rendering: show loader, empty states, or bookings list */}
        {loading ? (
          // Show spinner while loading bookings
          <ActivityIndicator style={{ marginTop: 32 }} />
        ) : !user ? (
          // Message shown when user is not signed in
          <Text style={{ marginTop: 24, color: "#64748b" }}>
            Please sign in to view your bookings.
          </Text>
        ) : bookings.length === 0 ? (
          // Message shown when user has no bookings
          <Text style={{ marginTop: 24, color: "#64748b" }}>No bookings yet</Text>
        ) : (
          // Render each booking card
          bookings.map((b) => (
            <View
              key={b.$id}
              style={{
                marginTop: 12,
                backgroundColor: "#fff",
                padding: 14,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#e5e7eb",
              }}
            >
              {/* Facility name */}
              <Text style={{ fontWeight: "800", color: "#0f172a" }}>
                {b.facilityName}
              </Text>
              {/* Booking time range */}
              <Text style={{ color: "#64748b", marginTop: 4 }}>
                {new Date(b.startAt).toLocaleString()} —{" "}
                {new Date(b.endAt).toLocaleTimeString()}
              </Text>
              {/* Optional booking notes */}
              {b.notes ? (
                <Text style={{ color: "#475569", marginTop: 4 }}>{b.notes}</Text>
              ) : null}
              {/* Booking ID display */}
              <Text style={{ color: "#94a3b8", marginTop: 6, fontSize: 12 }}>
                Booking ID: {b.$id}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
