import NextAuth from "next-auth";
import Google from "next-auth/providers/google"

import { createGuest, getGuest } from "./data-service";


const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        })
    ],
    callbacks: {
        authorized({ auth, request }) {
            return !!auth?.user;
        },
        async signIn({ user, account, profile }) {
            try {
                //  Check if a user already exists in db
                const existingGuest = await getGuest(user.email);

                // If no such user exists, create a new one
                if (!existingGuest) {
                    await createGuest({ email: user.email, fullName: user.name });
                }

                return true;
            } catch (error) {

                return false;
            }
        },
        async session({ session }) {
            const currentGuest = await getGuest(session.user.email);

            session.user.guestId = currentGuest.id;

            return session;
        }
    },
    pages: {
        signIn: '/login'
    }
};

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);