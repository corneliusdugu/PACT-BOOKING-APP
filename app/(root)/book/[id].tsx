// app/(root)/book/[id].tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { createBooking, getFacilityById } from "@/lib/mock-api";
import type { Facility } from "@/lib/types";
import { addMinutes, format, parse } from "date-fns";
import { useGlobalContext } from "@/lib/global-provider";

// Screen for booking a specific facility
export default function BookFacility() {
  // Extract facility ID from route parameters
  const { id } = useLocalSearchParams<{ id: string }>();

  // Access currently authenticated user from global context
  const { user } = useGlobalContext();

  // Local state for facility details and available booking slots
  const [facility, setFacility] = React.useState<Facility | undefined>();
  const [slots, setSlots] = React.useState<{ start: Date; end: Date }[]>([]);

  // Fetch facility info and generate time slots when screen mounts
  React.useEffect(() => {
    (async () => {
      const f = await getFacilityById(id!); // Retrieve facility by ID
      setFacility(f);

      // Generate available time slots based on facility's open/close hours
      if (f?.openFrom && f?.openTo) {
        const today = new Date();
        const base = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const from = parse(f.openFrom, "HH:mm", base);
        const to = parse(f.openTo, "HH:mm", base);
        const step = f.slotMinutes ?? 60; // Default to 60-minute intervals

        const arr: { start: Date; end: Date }[] = [];
        for (let t = from; t < to; t = addMinutes(t, step)) {
          const end = addMinutes(t, step);
          if (end <= to) arr.push({ start: new Date(t), end });
        }
        setSlots(arr);
      }
    })();
  }, [id]);

  // Handle booking a selected time slot
  const book = async (start: Date, end: Date) => {
    // Exit if no user or facility data is available
    if (!user || !facility) return;

    // Create a new booking record
    await createBooking({
      facility: facility.$id,   // Reference facility by its ID
      userId: user.$id,         // Use authenticated user's ID
      startAt: start.toISOString(),
      endAt: end.toISOString(),
      notes: "",
    });

    // Show success alert with facility and time details
    Alert.alert(
      "Booked!",
      `${facility.name} • ${format(start, "HH:mm")}–${format(end, "HH:mm")}`,
      [
        // Both buttons navigate back to the Profile tab after booking
        {
          text: "View in My Bookings",
          onPress: () =>
            router.replace({
              pathname: "/(root)/(tabs)/profile",
              params: { justBooked: "1" },
            }),
        },
        {
          text: "OK",
          onPress: () =>
            router.replace({
              pathname: "/(root)/(tabs)/profile",
              params: { justBooked: "1" },
            }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Display loading state while facility data is fetched */}
        {!facility ? (
          <Text>Loading…</Text>
        ) : (
          <>
            {/* Header and facility details */}
            <Text style={{ fontSize: 28, fontWeight: "800", color: "#0f172a" }}>Book</Text>
            <Text style={{ marginTop: 8, fontSize: 20, fontWeight: "700" }}>
              {facility.name}
            </Text>
            <Text style={{ color: "#64748b", marginBottom: 16 }}>{facility.address}</Text>

            {/* Available time slots section */}
            <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8 }}>
              Available time slots
            </Text>

            {/* Render a button for each available slot */}
            {slots.map((s, i) => (
              <TouchableOpacity key={i} onPress={() => book(s.start, s.end)}>
                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 14,
                    borderRadius: 12,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                  }}
                >
                  <Text style={{ fontWeight: "700" }}>
                    {format(s.start, "HH:mm")} – {format(s.end, "HH:mm")}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
