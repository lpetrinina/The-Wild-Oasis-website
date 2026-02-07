import SubmitButton from "@/src/components/SubmitButton";
import { updateReservation } from "@/src/lib/actions";
import { getBooking, getCabin, getSettings } from "@/src/lib/data-service";

async function Page({ params }) {
    const { bookingId } = await params;
    const { cabinId, numGuests, observations, hasBreakfast } = await getBooking(bookingId);
    const [{ maxCapacity }, { breakfastPrice }] = await Promise.all([
        getCabin(cabinId),
        getSettings()
    ]);

    return (
        <div>
            <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
                Edit Reservation #{bookingId}
            </h2>

            <form
                action={updateReservation}
                className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
            >
                <div className='space-y-2'>
                    <label htmlFor='numGuests'>How many guests?</label>
                    <select
                        name='numGuests'
                        id='numGuests'
                        defaultValue={numGuests}
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
                        defaultValue={observations}
                        className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                    />
                </div>

                <div>
                    <label htmlFor='hasBreakfast' className='flex gap-2 items-center'>
                        <input
                            className='h-6 aspect-square mb-0.5 '
                            type='checkbox'
                            name='hasBreakfast'
                            id='hasBreakfast'
                            defaultChecked={hasBreakfast}
                        />
                        Include breakfast +${breakfastPrice}
                        <span className='text-sm'>per guest /day</span>
                    </label>
                </div>

                <input type='hidden' name='bookingId' value={bookingId} />

                <div className='flex justify-end items-center gap-6'>
                    <SubmitButton>Update reservation</SubmitButton>
                </div>
            </form>
        </div>
    );
}

export default Page;
