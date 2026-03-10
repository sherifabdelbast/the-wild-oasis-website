import { eachDayOfInterval } from "date-fns";
import type {
  Cabin,
  CabinPrice,
  Booking,
  Guest,
  Country,
  Settings,
} from "./types";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";
// Supabase client - assumed to be provided globally or via dependency injection
// eslint-disable-next-line @typescript-eslint/no-explicit-any

/////////////
// GET

export async function getCabin(id: number): Promise<Cabin | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data as Cabin | null;
}

export async function getCabinPrice(id: number): Promise<CabinPrice | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data as CabinPrice | null;
}

export const getCabins = async function (): Promise<Cabin[]> {
  const result = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  const { data, error } = result as { data: Cabin[] | null; error: unknown };
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data ?? [];
};

export async function getGuest(email: string): Promise<Guest | null> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data as Guest | null;
}

export async function getBooking(id: number): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data as Booking | null;
}

export async function getBookings(guestId: number): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Map data to Booking type, add default status if missing
  return (data ?? []).map((item: any) => ({
    ...item,
    status: item.status ?? "unknown", // Provide a default value if status is missing
    cabins:
      Array.isArray(item.cabins) && item.cabins.length > 0
        ? item.cabins[0]
        : item.cabins, // Ensure cabins matches Booking type
  })) as Booking[];
}

export async function getBookedDatesByCabinId(
  cabinId: number,
): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayStr = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${todayStr},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookings = (data ?? []) as { startDate: string; endDate: string }[];
  const bookedDates = bookings
    .map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      }),
    )
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data as Settings;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = (await res.json()) as Country[];
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: Partial<Guest>): Promise<unknown> {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(
  newBooking: Partial<Booking>,
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data as Booking | null;
}

/////////////
// UPDATE

export async function updateGuest(
  id: number,
  updatedFields: Partial<Guest>,
): Promise<Guest | null> {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data as Guest | null;
}

export async function updateBooking(
  id: number,
  updatedFields: Partial<Booking>,
): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data as Booking | null;
}

/////////////
// DELETE

export async function deleteBooking(id: number): Promise<void> {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
