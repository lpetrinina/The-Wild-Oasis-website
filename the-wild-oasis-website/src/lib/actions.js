"use server";

import { supabase } from "./supabase";
import { auth, signIn, signOut } from "./auth";
import { refresh, revalidatePath } from "next/cache";

import { getBookings } from "./data-service";
import { redirect } from "next/navigation";


export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
    // Check if there is an authenticated user
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
    revalidatePath("/account/profile");
    redirect('/account')
}

export async function createReservation(bookigData, formData) {

    // Check if there is an authenticated user
    const session = await auth();
    if (!session) {
        throw new Error("You must be logged in!");
    };

    const numGuests = Number(formData.get('numGuests'));
    const observations = formData.get('observations').slice(0, 1000); // Get only 1000 chars to prevent sending huge data to db

    const newBooking = {
        ...bookigData,
        numGuests,
        observations,
        extrasPrice: 0,
        totalPrice: bookigData.cabinPrice,
        status: 'unconfirmed',
        hasBreakfast: false,
        isPaid: false,
        guestId: session.user.guestId
    }

    const { error } = await supabase
        .from("bookings")
        .insert([newBooking])

    if (error) {
        console.error(error);
        throw new Error("Booking could not be created");
    }

    revalidatePath(`/cabins/${bookigData.cabinId}`);
    redirect('/cabins/thank-you');

}

export async function updateReservation(formData) {
    const bookingId = Number(formData.get('bookingId'));

    // Check if there is an authenticated user
    const session = await auth();
    if (!session) {
        throw new Error("You must be logged in!");
    };


    // Check if the user is authorized to edit that booking
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingsIds.includes(bookingId)) {
        throw new Error("You are not allowed to edit this booking!");
    };

    const updatedData = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
    };

    const { error } = await supabase
        .from("bookings")
        .update(updatedData)
        .eq("id", bookingId);

    if (error) {
        console.error(error);
        throw new Error("Booking could not be updated");
    }

    revalidatePath(`/account/reservations/edit/${bookingId}`);
    redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
    // Check if there is an authenticated user
    const session = await auth();
    if (!session) {
        throw new Error("You must be logged in!");
    }

    // Check if the user is authorized to delete that booking
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingsIds.includes(bookingId)) {
        throw new Error("You are not allowed to delete this booking!");
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
