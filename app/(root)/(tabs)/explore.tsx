import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput, Text } from "react-native";
import FacilityCard from "@/components/FacilityCard";
import { listFacilities } from "@/lib/mock-api";
import { router } from "expo-router";
import type { Facility } from "@/lib/types";

// Explore screen component for listing and searching facilities
export default function Explore() {
  // State for storing all facility data
  const [all, setAll] = React.useState<Facility[]>([]);
  // State for search query input
  const [q, setQ] = React.useState("");

  // Fetch facility data on component mount
  React.useEffect(() => { 
    listFacilities().then(setAll); 
  }, []);

  // Filter facilities based on search query (case-insensitive)
  const filtered = all.filter(f =>
    (f.name + " " + f.address + " " + f.type)
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  // Navigate to booking screen with selected facility ID
  const goBook = (id: string) => 
    router.push({ pathname: "/book/[id]", params: { id } });

  return (
    // Safe area wrapper to prevent overlapping with system UI (e.g., notch)
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Scrollable container for the facility list */}
      <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
        {/* Search input field */}
        <TextInput
          placeholder="Search facilities"
          value={q}
          onChangeText={setQ}
          style={{
            marginHorizontal: 16,
            marginBottom: 12,
            backgroundColor: "#fff",
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderColor: "#e5e7eb",
            borderWidth: 1,
          }}
        />

        {/* Conditional rendering: show 'No results' message if filtered list is empty */}
        {filtered.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              color: "#6b7280",
            }}
          >
            No results
          </Text>
        ) : (
          // Render a FacilityCard component for each filtered facility
          filtered.map(f => (
            <FacilityCard 
              key={f.$id} 
              item={f} 
              onBook={goBook} 
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
