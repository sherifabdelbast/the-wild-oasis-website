"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import type { ReservationData } from "./types";

export async function updateGuest(formData: FormData) {
  const session = await getAuthSession();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = (formData.get("nationality") as string).split("%");
  const regex = /^[a-zA-Z0-9]{6,12}$/;

  if (!regex.test(nationalID)) {
    throw new Error("Please provide a valid national ID");
  }
  const updateData = { nationality, countryFlag, nationalID };
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session?.user?.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId: number) {
  const session = await getAuthSession();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId!);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData: FormData) {
  const session = await getAuthSession();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId!);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  const bookingId = Number(formData.get("bookingId"));

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: (formData.get("observations") as string).slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  //revalidation
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  //redirect
  redirect("/account/reservations");
}

export async function createReservation(reservationData: ReservationData, formData: FormData) {
  const session = await getAuthSession();
  if (!session) throw new Error("You must be logged in");
  const newReservation = {
    ...reservationData,
    guestId: session?.user.guestId!,
    numGuests: Number(formData.get("numGuests")),
    observations: (formData.get("observations") as string).slice(0, 1000),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([newReservation])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${reservationData.cabinId}`);

  return { bookingId: data.id, totalPrice: newReservation.totalPrice };
}
