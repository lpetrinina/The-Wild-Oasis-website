# The-Wild-Oasis-website

A full-stack hotel booking website built with Next.js, developed as part of a Udemy course by Jonas Schmedtmann and extended with additional custom features.
This project focuses on mastering the core principles of Next.js, including routing, server components, authentication and data fetching.

🔍 See live demo [here](https://the-wild-oasis-website-luiza.vercel.app/)

<img width="1918" height="1023" alt="image" src="https://github.com/user-attachments/assets/4d2c5793-bcc0-4b61-9980-10283e12d7f5" />


## Installation 

⚠️ Clone down this repository. You will need  `npm` installed globally on your machine.  

 Installation:  👉  `npm install`

 Run development server: 👉  `npm run dev`
 
 The app will run at: 👉 `http://localhost:3000`

 🔑 **Environment Variables** - to run the project locally, you will need:

   - Supabase project URL
   - Supabase anon key
   - NextAuth configuration
   - Authentication provider credentials

Create a ****.env.local file**** and add the required environment variables.

 ## Usage

 The application is designed for potential guests exploring the hotel and already registered guests which can manage their reservations.

## Features and Functionality

✅ **Cabin** – guests can explore all available cabins

  * View detailed information for each cabin
  * See booked/unavailable dates
  * Filter cabins by maximum guest capacity

✅ **About** – guests are able to learn all about the Wild Oasis Hotel
    
✅ **Authentication** – guests have to sign up and log in before making or managing reservations

  * New users can create an account via the sign up/login page
  * A user profile is automatically created in the database upon registration

✅ **Profile** - authenticated guests can update their personal information to make check-in faster

✅ **Reservations** – authenticated guests can manage their bookings

 * Reserve a cabin for a selected date range
 * New reservations are automatically set to “unconfirmed”
 * View all past and upcoming reservations 
 * Update an existing reservation
 * Delete a reservation
 * Payments are handled at the property (no online payment integration)

## Additional Improvements (beyond course requirements)

🥐 **Breakfast Add-On** (Custom Feature)
 * Guests can add breakfast during reservation
 * Breakfast option can be modified when editing a booking

📱 **Responsive Design** (Custom Implementation)
  * Mobile-first adjustments
  * Optimized layout for tablets and smartphones
  * Improved user experience across screen sizes

## Technologies and Concepts

### Technologies
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/next_js.png" width="20" align="center" /> **Next.js** - full-stack React framework (App Router, Server Components, SSR)
  
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" width="20" align="center" />  **React** - component-based UI development
  
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" width="20" align="center" /> **JavaScript** - for dynamic interactions
  
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png" width="20" align="center" /> **Tailwind CSS** - utility-first styling
  
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/supabase.png" width="20" align="center" /> **Supabase** - to create a back-end with a Postgres database
  
   <img src="https://github.com/nextauthjs/next-auth/blob/main/docs/public/img/logo-sm.png" width="15" align="center" />   **NextAuth** - authentication and session management 
  
🔗 **REST API** – communication with Supabase
  
**Others** –  React Day Picker(UI library), date-fns (date handling utilities), Heroicons and React Icons

### Core Next.js & React Concepts

 - **App Router** – modern routing system with nested layouts
 - **Server & Client Components** – separation of server-side and interactive logic
 - **Dynamic Routing** – cabin detail pages and edit reservation
 - **Authentication Guards** – protected routes for logged-in users
 - **Server Actions / Data Fetching** – handling mutations and data updates
 - **State Management** – managing booking state and UI interactions
 - **Environment Variables** – secure configuration for backend services

 
