"use client";

import { updateProfile } from "../lib/actions";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ guest, children }) {
    const { fullName, email, nationalID, countryFlag } = guest;

    return (
        <form
            action={updateProfile}
            className='bg-primary-900 py-6 px-4 sm:py-8 sm:px-12 text-base sm:text-lg flex flex-col gap-5 sm:gap-6'
        >
            <div className='space-y-2'>
                <label>Full name</label>
                <input
                    disabled
                    name='fullName'
                    defaultValue={fullName}
                    className='px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
                />
            </div>

            <div className='space-y-2'>
                <label>Email address</label>
                <input
                    disabled
                    name='email'
                    defaultValue={email}
                    className='px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
                />
            </div>

            <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <label htmlFor='nationality'>Where are you from?</label>
                    <img
                        src={countryFlag || null}
                        alt='Country flag'
                        className='h-5 rounded-sm'
                    />
                </div>

                {/* Put Server Component into Client Componet via children prop */}
                {children}
            </div>

            <div className='space-y-2'>
                <label htmlFor='nationalID'>National ID number</label>
                <input
                    name='nationalID'
                    defaultValue={nationalID}
                    className='px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                    required
                />
                <p className="italic text-sm sm:text-base text-primary-400">Please enter an ID with letters and numbers only, maximum 12 characters.</p>

            </div>

            <div className='flex justify-center sm:justify-end'>
                <SubmitButton>
                    Update profile
                </SubmitButton>
            </div>
        </form>
    );
}


export default UpdateProfileForm;

