import type { Booking, Facility, User } from "./types";

// Simulated “logged-in” user for the mock API
let _user: User | null = { $id: "u_demo", name: "Demo User", email: "demo@pact.local" };

// Mock list of facilities used for testing and demo purposes
const facilities: Facility[] = [
  {
    $id: "f1",
    name: "MUGA Court A",
    type: "MUGA",
    description: "Outdoor multi-use games area.",
    address: "Barclay Park, Peterhead",
    image: "https://mcardlesport.co.uk/wp-content/uploads/2016/03/McArdle-Sport-Tec-Polymeric.jpg",
    openFrom: "10:00",
    openTo: "22:00",
    slotMinutes: 60,
    pricePerSlot: 1000,
  },
  {
    $id: "f2",
    name: "Pump Track",
    type: "PumpTrack",
    description: "Bikes, boards & scooters welcome.",
    address: "Barclay Park, Peterhead",
    image: "https://temeculaca.gov/ImageRepository/Document?documentID=11970",
    openFrom: "10:00",
    openTo: "22:00",
    slotMinutes: 60,
    pricePerSlot: 0,
  },
  {
    $id: "f3",
    name: "Community Hall",
    type: "Hall",
    description: "Great for events and classes.",
    address: "Victoria Park, Peterhead",
    image: "https://static.where-e.com/United_Kingdom/Victoria-Park-Community-Centre_421d9af675386b815f7748766871e360.jpg",
    openFrom: "10:00",
    openTo: "22:00",
    slotMinutes: 60,
    pricePerSlot: 1500,
  },
];

// In-memory list of user bookings (mocked storage)
let bookings: Booking[] = [];

/**
 * Retrieve the current signed-in mock user.
 */
export async function getCurrentUser(): Promise<User | null> {
  // Return simulated “signed-in” user
  return _user;
}

/**
 * Mock anonymous sign-in.
 * Returns a static demo user.
 */
export async function signInAnonymously(): Promise<User> {
  _user = { $id: "u_demo", name: "Demo User", email: "demo@pact.local" };
  return _user;
}

/**
 * Mock sign-out operation.
 * Clears the current mock user.
 */
export async function signOut(): Promise<void> {
  _user = null;
}

/**
 * Return a list of mock facilities.
 */
export async function listFacilities(): Promise<Facility[]> {
  return facilities;
}

/**
 * Find a single facility by its ID.
 */
export async function getFacilityById(id: string): Promise<Facility | undefined> {
  return facilities.find(f => f.$id === id);
}

/**
 * Create a new booking and add it to the in-memory list.
 * Automatically generates ID, creation time, and sets default status.
 */
export async function createBooking(
  b: Omit<Booking, "$id" | "createdAt" | "status">
): Promise<Booking> {
  const newB: Booking = {
    ...b,
    $id: `b_${Date.now()}`,                // Unique booking ID
    status: "Pending",                     // Default status
    createdAt: new Date().toISOString(),   // Timestamp
  };
  bookings.unshift(newB); // Add to start of array (newest first)
  return newB;
}

/**
 * List all bookings created by a specific user.
 */
export async function listBookingsByUser(userId: string): Promise<Booking[]> {
  return bookings.filter(b => b.userId === userId);
}
