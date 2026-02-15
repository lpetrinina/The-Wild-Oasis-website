"use client";

import { differenceInDays } from "date-fns";

import { useReservation } from "./ReservationContext";
import { createReservation } from "../lib/actions";
import { isAlreadyBooked } from "../lib/helpers/isAlreadyBooked";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user, bookedDates, settings }) {

    const { range } = useReservation();
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
            <div className='bg-primary-800 text-primary-300 px-4 sm:px-16 py-2 flex justify-between items-center'>
                <p>Logged in as</p>

                <div className='flex gap-4 items-center'>
                    <img
                        // Important to display google profile images
                        referrerPolicy='no-referrer'
                        className='h-6 sm:h-8 rounded-full'
                        src={user.image}
                        alt={user.name}
                    />
                    <p>{user.name}</p>
                </div>
            </div>

            <form action={createReservationWithData}
                className='bg-primary-900 px-4 py-6 sm:px-16 sm:py-10 text-base sm:text-lg flex flex-col gap-6'
            >
                <div className='space-y-2'>
                    <label htmlFor='numGuests'>How many guests?</label>
                    <select
                        name='numGuests'
                        id='numGuests'
                        className='px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
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
                        className='px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                        placeholder='Any pets, allergies, special requirements, etc.?'
                    />
                </div>

                <div>
                    <label htmlFor='hasBreakfast' className='flex gap-1 sm:gap-2 items-center'>
                        <input className="h-5 sm:h-6 aspect-square mb-0.5 " type="checkbox" name="hasBreakfast" id="hasBreakfast" />
                        Include breakfast +${settings.breakfastPrice}
                        <span className="text-sm">per guest /day</span>
                    </label>
                </div>

                <div className='flex flex-col-reverse sm:flex-row sm:justify-end items-center gap-4'>

                    {!hasSelectedRange &&
                        <p className='text-accent-500 text-sm sm:text-base'>Start by selecting dates</p>
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
