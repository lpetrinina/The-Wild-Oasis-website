'use server';

import { supabase } from "./supabase";
import { auth, signIn, signOut } from "./auth";

export async function signInAction() {
    await signIn('google', { redirectTo: '/account' });
};

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
};

export async function updateProfile(formData) {

    // Check if there is an authorized user
    const session = await auth();
    if (!session) {
        throw new Error('You must be logged in!')
    }

    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');

    // Validate a nationalID
    const pattern = /^[a-zA-Z0-9]{6,12}$/;
    if (!pattern.test(nationalID)) {
        throw new Error('Please provide a valid national ID!');
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

}