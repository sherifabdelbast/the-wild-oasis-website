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
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
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
  image?: string;
  [key: string]: unknown;
}

export interface Country {
  name: string;
  flag: string;
}

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface Settings {
  [key: string]: unknown;
}
