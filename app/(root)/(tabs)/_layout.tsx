// app/(root)/(tabs)/_layout.tsx

import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Define the main tab layout component for the app
export default function TabsLayout() {
  return (
    // Tabs component from Expo Router to handle bottom tab navigation
    <Tabs
      screenOptions={{
        headerShown: false, // Hide the header for all screens in this tab layout
        tabBarActiveTintColor: "#2563eb", // Color for the active tab icon and label
        tabBarInactiveTintColor: "#94a3b8", // Color for the inactive tab icon and label
      }}
    >
      {/* Home tab configuration */}
      <Tabs.Screen
        name="index" // Corresponds to the file name of the screen (index.tsx)
        options={{
          title: "Home", // Title shown under the tab icon
          // Define the icon for the Home tab, changing based on focus state
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"} // Filled icon when focused, outline when not
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Explore tab configuration */}
      <Tabs.Screen
        name="explore" // Corresponds to the explore.tsx screen
        options={{
          title: "Explore",
          // Define the icon for the Explore tab
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"} // Toggle icon based on focus
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Profile tab configuration */}
      <Tabs.Screen
        name="profile" // Corresponds to the profile.tsx screen
        options={{
          title: "Profile",
          // Define the icon for the Profile tab
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"} // Change icon when focused
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
