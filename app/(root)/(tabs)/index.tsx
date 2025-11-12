import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import FacilityCard from "@/components/FacilityCard";
import { listFacilities } from "@/lib/mock-api";
import { router } from "expo-router";
import type { Facility } from "@/lib/types";

// Home screen component displaying a list of available facilities
export default function Home() {
  // State to hold the list of facilities
  const [items, setItems] = React.useState<Facility[]>([]);
  // State to track loading status while fetching data
  const [loading, setLoading] = React.useState(true);

  // Fetch facilities when the component mounts
  React.useEffect(() => {
    (async () => {
      try {
        const data = await listFacilities(); // Retrieve facilities from mock API
        setItems(data ?? []); // Set retrieved data or empty array as fallback
      } finally {
        setLoading(false); // Stop loading indicator after fetch completes
      }
    })();
  }, []);

  // Navigate to the booking screen for a selected facility
  const goBook = (id: string) => {
    router.push({ pathname: "/(root)/book/[id]", params: { id } });
  };

  return (
    // Safe area wrapper for consistent layout on all devices
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      ) : (
        // Scrollable container for the list of facilities
        <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
          {/* Show message if there are no facilities available */}
          {items.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 24, color: "#6b7280" }}>
              No facilities available
            </Text>
          ) : (
            // Render a FacilityCard for each facility in the list
            items.map((f) => (
              <FacilityCard 
                key={f.$id} 
                item={f} 
                onBook={goBook} 
              />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
