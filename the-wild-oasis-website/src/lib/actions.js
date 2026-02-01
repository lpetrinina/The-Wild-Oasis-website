"use server";

import { supabase } from "./supabase";
import { auth, signIn, signOut } from "./auth";
import { refresh, revalidatePath } from "next/cache";
import { getBookings } from "./data-service";

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
    // Check if there is an authorized user
    const session = await auth();
    if (!session) {
        throw new Error("You must be logged in!");
    }

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    // Validate a nationalID
    const pattern = /^[a-zA-Z0-9]{6,12}$/;
    if (!pattern.test(nationalID)) {
        throw new Error("Please provide a valid national ID!");
    }

    const updatedData = { nationalID, nationality, countryFlag };

    // Update user data in Supabase
    const { data, error } = await supabase
        .from("guests")
        .update(updatedData)
        .eq("id", session.user.guestId);

    if (error) {
        throw new Error("Guest could not be updated");
    }

    // Revalidate cache
    refresh();
    revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {

    // Check if there is an authorized user
    const session = await auth();
    if (!session) {
        throw new Error("You must be logged in!");
    }

    // Check if the reservation is really made by the user
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map(booking => booking.id);

    if (!guestBookingsIds.includes(bookingId)) {
        throw new Error('You are not allowed to delete this booking!')
    }

    // Delete booking in Supabase
    const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }

    // Revalidate cache
    revalidatePath("/account/reservations");
}
