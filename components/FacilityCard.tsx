import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Facility } from "@/lib/types";

// Define component props: facility item and optional booking handler
type Props = { item: Facility; onBook?: (id: string) => void };

// Component to display facility details in a styled card layout
export default function FacilityCard({ item, onBook }: Props) {
  return (
    <View style={styles.card}>
      {/* Facility image */}
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

      {/* Facility name */}
      <Text style={styles.title}>{item.name}</Text>

      {/* Facility address */}
      <Text style={styles.address}>{item.address}</Text>

      {/* Book Now button triggers the onBook callback with facility ID */}
      <TouchableOpacity onPress={() => onBook?.(item.$id)} style={styles.btn}>
        <Text style={styles.btnText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the facility card and its elements
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",        // White background for clean look
    borderRadius: 16,               // Rounded corners for card
    padding: 16,                    // Inner spacing
    marginHorizontal: 16,           // Horizontal spacing between cards
    marginBottom: 16,               // Vertical spacing below each card
    shadowColor: "#000",            // Shadow color for elevation
    shadowOpacity: 0.08,            // Subtle shadow opacity
    shadowRadius: 10,               // Soft shadow edges
    elevation: 3,                   // Android elevation for depth
  },
  image: {
    width: "100%",                  // Full-width image
    height: 180,                    // Fixed height for consistency
    borderRadius: 12,               // Rounded corners for image
    marginBottom: 12,               // Spacing below image
    backgroundColor: "#eee",        // Placeholder background color
  },
  title: {
    fontSize: 20,                   // Prominent font size for name
    fontWeight: "800",              // Bold title text
    color: "#111",                  // Dark text color
    marginBottom: 4,                // Small spacing below title
  },
  address: {
    fontSize: 15,                   // Medium font size for address
    color: "#6b7280",               // Muted gray text
    marginBottom: 12,               // Spacing before button
  },
  btn: {
    backgroundColor: "#2563eb",     // Blue background for button
    paddingVertical: 14,            // Vertical padding for height
    borderRadius: 12,               // Rounded button corners
    alignItems: "center",           // Center text horizontally
  },
  btnText: {
    color: "#fff",                  // White text for contrast
    fontSize: 16,                   // Readable text size
    fontWeight: "700",              // Bold button label
  },
});
