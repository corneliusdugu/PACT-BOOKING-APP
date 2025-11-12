// lib/global-provider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "./types";

// Define the shape of the global context
type Ctx = {
  user: User | null;              // Currently authenticated user or null
  loading: boolean;               // Indicates whether user data is being loaded
  isLogged: boolean;              // True if a user is logged in
  signIn: () => Promise<void>;    // Mock Google sign-in function
  signOut: () => Promise<void>;   // Sign-out function
  refetch: () => Promise<void>;   // Reload user data from storage
};

// Create a React context for global state
const Ctx = createContext<Ctx | null>(null);

// Storage key used to persist user data
const STORAGE_KEY = "@pact:user";

// Global provider component that wraps the app and manages authentication state
export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load persisted user from AsyncStorage (used for session persistence)
  const loadUser = async () => {
    setLoading(true);
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      setUser(raw ? (JSON.parse(raw) as User) : null);
    } finally {
      setLoading(false);
    }
  };

  // Load user on initial mount
  useEffect(() => {
    loadUser();
  }, []);

  // Demo sign-in function that mocks a “Google” login
  const signIn = async () => {
    const demoUser: User = {
      $id: "demo_user_001",       // Unique user ID for mock session
      name: "PACT Demo",          // Display name for demo user
      email: "demo@pact.local",   // Demo email address
      avatar: "",                 // Placeholder for optional avatar
    };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser)); // Persist to storage
    setUser(demoUser);
  };

  // Remove user session from storage and state
  const signOut = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  // Provide global values and functions to child components
  return (
    <Ctx.Provider
      value={{
        user,
        loading,
        isLogged: !!user,
        signIn,
        signOut,
        refetch: loadUser,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

// Custom hook to access the global context safely
export const useGlobalContext = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGlobalContext must be used within GlobalProvider");
  return ctx;
};
