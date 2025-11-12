// Define the various facility types supported by the app
export type FacilityType =
  | "MUGA"         // Multi-Use Games Area
  | "PumpTrack"    // Track for bikes, boards, or scooters
  | "EventSpace"   // General-purpose event venue
  | "Hall"         // Community or sports hall
  | "MeetingRoom"  // Meeting or conference room
  | "Other";       // Fallback for non-categorized facilities

// Facility object definition representing a bookable location
export interface Facility {
  $id: string;             // Unique facility ID
  name: string;            // Facility name
  type: FacilityType;      // Facility type (from enum above)
  description: string;     // Short description of facility
  address: string;         // Physical location or address
  image: string;           // Main image URL
  gallery?: string[];      // Optional list of additional images
  openFrom?: string;       // Opening time (e.g., "08:00")
  openTo?: string;         // Closing time (e.g., "21:00")
  slotMinutes?: number;    // Duration of one booking slot (in minutes)
  pricePerSlot?: number;   // Cost per slot (in pennies or cents)
}

// Possible statuses for a booking record
export type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

// Booking object definition representing a single reservation
export interface Booking {
  $id: string;         // Unique booking ID
  facility: string;    // Facility ID (links to Facility.$id)
  userId: string;      // ID of the user who made the booking
  startAt: string;     // Start time (ISO format)
  endAt: string;       // End time (ISO format)
  status: BookingStatus; // Current booking status
  notes?: string;      // Optional additional notes
  createdAt: string;   // Timestamp of booking creation (ISO)
}

// User object definition representing a logged-in user
export interface User {
  $id: string;     // Unique user ID
  name: string;    // Display name
  email?: string;  // Optional email address
}
