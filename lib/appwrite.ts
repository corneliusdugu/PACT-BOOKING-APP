// lib/appwrite.ts
import { Account, Client } from "react-native-appwrite";
import { Linking, Alert } from "react-native";
import * as AuthSession from "expo-auth-session";
import type { User } from "./types";

// Load Appwrite endpoint and project ID from environment variables
const APPWRITE_ENDPOINT =
  process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";

const APPWRITE_PROJECT =
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT ||
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ||
  "";

// Initialize and configure Appwrite client
const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT);
const account = new Account(client);

/**
 * Get the currently authenticated Appwrite user.
 * Returns a simplified user object or null if no user is logged in.
 */
export async function appwriteGetCurrentUser(): Promise<User | null> {
  try {
    const u = await account.get(); // Retrieve user from Appwrite
    return {
      $id: u.$id,
      name: u.name || "User",       // Fallback to "User" if name is missing
      email: (u as any).email ?? "", // Type-safe access to email
    };
  } catch {
    // Return null if session is invalid or user not logged in
    return null;
  }
}

/**
 * Begin a Google OAuth sign-in using Appwrite's built-in OAuth2 integration.
 * Uses Expo AuthSession to create a secure redirect URI that Appwrite accepts.
 */
export async function appwriteSignInWithGoogle(): Promise<void> {
  // Ensure project ID is configured before proceeding
  if (!APPWRITE_PROJECT) {
    Alert.alert("Appwrite not configured", "Missing project id env var.");
    return;
  }

  // Generate a valid HTTPS redirect URI Appwrite Cloud will accept
  // `useProxy: true` ensures a proper redirect via Expo's AuthSession proxy
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "pactbooking", // Must match the app.json "scheme"
    useProxy: true,        // Produces an HTTPS redirect URL (required by Appwrite)
  });

  const provider = "google";
  const success = redirectUri;              // Success redirect
  const failure = `${redirectUri}?error=1`; // Failure redirect

  // Construct the Appwrite OAuth2 sign-in URL
  const url =
    `${APPWRITE_ENDPOINT}/account/sessions/oauth2/${provider}` +
    `?project=${encodeURIComponent(APPWRITE_PROJECT)}` +
    `&success=${encodeURIComponent(success)}` +
    `&failure=${encodeURIComponent(failure)}`;

  // Debugging logs for development (optional)
  console.log("[APPWRITE] endpoint:", APPWRITE_ENDPOINT);
  console.log("[APPWRITE] project:", APPWRITE_PROJECT);
  console.log("[APPWRITE] redirectUri:", redirectUri);
  console.log("[APPWRITE] oauth url:", url);

  // Launch the OAuth sign-in flow in the system browser
  await Linking.openURL(url);
}

/**
 * Sign out the current user by deleting the active Appwrite session.
 * If no session exists, the error is safely ignored.
 */
export async function appwriteSignOut(): Promise<void> {
  try {
    await account.deleteSession("current");
  } catch {
    // Ignore if user already signed out or no session exists
  }
}

// Export configured Appwrite client and account for reuse
export { client, account };
