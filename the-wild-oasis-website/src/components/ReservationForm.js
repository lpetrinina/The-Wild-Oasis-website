"use client";

import { differenceInDays } from "date-fns";

import { useReservation } from "./ReservationContext";
import { createReservation } from "../lib/actions";
import { isAlreadyBooked } from "../lib/helpers/isAlreadyBooked";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user, bookedDates }) {
    const { range, resetRange } = useReservation();
    const { id, maxCapacity, regularPrice, discount } = cabin;

    const displayRange = isAlreadyBooked(range, bookedDates) ? { from: undefined, to: undefined } : range;
    const hasSelectedRange = displayRange.from && displayRange.to;

    const startDate = range.from;
    const endDate = range.to;
    const numNights = differenceInDays(endDate, startDate);
    const cabinPrice = numNights * (regularPrice - discount);

    const bookingData = {
        cabinId: id,
        startDate,
        endDate,
        numNights,
        cabinPrice,
    };

    const createReservationWithData = createReservation.bind(null, bookingData); // attach the booking data to the createReservation Server Action

    return (
        <div>
            <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
                <p>Logged in as</p>

                <div className='flex gap-4 items-center'>
                    <img
                        // Important to display google profile images
                        referrerPolicy='no-referrer'
                        className='h-8 rounded-full'
                        src={user.image}
                        alt={user.name}
                    />
                    <p>{user.name}</p>
                </div>
            </div>

            <form
                action={async (formData) => {
                    await createReservationWithData(formData);
                    resetRange();
                }}
                className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'
            >
                <div className='space-y-2'>
                    <label htmlFor='numGuests'>How many guests?</label>
                    <select
                        name='numGuests'
                        id='numGuests'
                        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        required
                    >
                        <option value='' key=''>
                            Select number of guests...
                        </option>
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='space-y-2'>
                    <label htmlFor='observations'>
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name='observations'
                        id='observations'
                        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        placeholder='Any pets, allergies, special requirements, etc.?'
                    />
                </div>

                <div className='flex justify-end items-center gap-6'>

                    {!hasSelectedRange &&
                        <p className='text-accent-500 text-base'>Start by selecting dates</p>
                    }

                    <SubmitButton pendingLabel="Reserving..." disabled={!hasSelectedRange} >
                        Reserve now
                    </SubmitButton>

                </div>
            </form>
        </div>
    );
}

export default ReservationForm;
