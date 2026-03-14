// Shared types for cabins, bookings, guests, and API responses

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description?: string;
}

export interface CabinPrice {
  regularPrice: number;
  discount: number;
}

export interface Booking {
  id: number;
  guestId: number;
  cabinId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  observations: string;
  status: string;
  created_at: string;
  cabins: {
    name: string;
    image: string;
  };
}

export interface Guest {
  id: number;
  email: string;
  fullName: string;
  nationality?: string;
  nationalID?: string;
  countryFlag?: string;
  image?: string;
  [key: string]: unknown;
}

export interface Country {
  name: string;
  flag: string;
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface ReservationData {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
}

export interface User {
  name: string;
  image?: string | null;
}

export interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
  [key: string]: unknown;
}
