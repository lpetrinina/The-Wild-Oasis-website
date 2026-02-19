import { updateReservation } from "@/src/lib/actions";
import { getBooking, getCabin, getSettings } from "@/src/lib/data-service";

import SubmitButton from "@/src/components/SubmitButton";
import BreakfastOption from "@/src/components/BreakfastOption";

async function Page({ params }) {
    const { bookingId } = await params;
    const { cabinId, numGuests, observations, hasBreakfast } = await getBooking(bookingId);
    const [{ maxCapacity }, { breakfastPrice }] = await Promise.all([
        getCabin(cabinId),
        getSettings()
    ]);

    const updateReservationWithData = updateReservation.bind(null, Number(bookingId));// attach the bookingId to the updateReservation Server Action

    return (
        <div>
            <h2 className='font-semibold text-base sm:text-2xl text-accent-400 mb-6 sm:mb-8'>
                Edit Reservation #{bookingId}
            </h2>

            <form
                action={updateReservationWithData}
                className='flex gap-6 flex-col bg-primary-900 py-6 px-4 sm:py-8 sm:px-12 text-base sm:text-lg '
            >
                <div className='space-y-2'>
                    <label htmlFor='numGuests'>How many guests?</label>
                    <select
                        name='numGuests'
                        id='numGuests'
                        defaultValue={numGuests}
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
                        defaultValue={observations}
                        className='px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                    />
                </div>

                <BreakfastOption hasBreakfast={hasBreakfast} breakfastPrice={breakfastPrice} />

                <div className='flex justify-center sm:justify-end items-center'>
                    <SubmitButton>Update reservation</SubmitButton>
                </div>
            </form>
        </div>
    );
}

export default Page;
