'use client';

import { differenceInDays, isPast, isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useReservation } from "./ReservationContext";
import { isAlreadyBooked } from "../lib/helpers/isAlreadyBooked";


function DateSelector({ cabin, settings, bookedDates }) {
    const { range, setRange, resetRange } = useReservation();

    const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
    const hasValidRange = range?.from && range?.to && !isAlreadyBooked(range, bookedDates);

    const { minBookingLength, maxBookingLength } = settings;
    const { regularPrice, discount } = cabin;

    const numNights = hasValidRange ? differenceInDays(displayRange.to, displayRange.from) : 0;
    const cabinPrice = hasValidRange ? numNights * (regularPrice - discount) : 0;

    return (

        <div className="flex flex-col justify-between">
            <DayPicker
                className="pt-12 lg:pt-20 place-self-center px-4 pb-2 sm:pb-4 text-sm sm:text-base"
                animate
                mode="range"
                min={minBookingLength + 1}
                max={maxBookingLength}
                startDate={new Date()}
                startMonth={new Date()}
                endMonth={new Date(new Date().getFullYear() + 2, 11)}
                captionLayout="dropdown"
                numberOfMonths={1}
                onSelect={(currentRange) => setRange(currentRange)}
                selected={displayRange}
                disabled={(currentDate) => isPast(currentDate) || bookedDates.some(date => isSameDay(date, currentDate))}
            />

            <div className="flex flex-col sm:flex-row gap-2 items-center sm:justify-between px-4 py-2 sm:px-6 sm:py-4 bg-accent-500 text-primary-800 min-h-30 sm:min-h-20">

                <div className="flex items-center justify-center gap-4">

                    {/* Cabin Price */}
                    <p className="flex gap-1 items-baseline">
                        {discount > 0 ? (
                            <>
                                <span className="text-xl sm:text-2xl">${regularPrice - discount}</span>
                                <span className="line-through font-semibold text-primary-700">
                                    ${regularPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl sm:text-2xl">${regularPrice}</span>
                        )}
                        <span>/night</span>
                    </p>

                    <div className="flex items-center relative">

                        {/* Placeholder */}
                        <p className={`absolute text-base font-medium mt-0.5 transition-all duration-300 ease-out 
                            ${hasValidRange ? 'opacity-0 translate-y-1' : 'opacity-60 translate-y-0'}`
                        }>
                            Set your stay
                        </p>

                        {/* Nights + Total Price */}
                        <div className={`flex gap-4 items-center transition-all duration-300 ease-out
                            ${hasValidRange ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`
                        }>

                            <p className='bg-accent-600 px-1.5 py-1 md:p-1 text-lg sm:text-xl tabular-nums font-semibold'>
                                <span>&times;</span>{' '}<span>{numNights} </span>
                            </p>

                            <p className='flex flex-col sm:flex-row sm:gap-1 items-center mt-1'>
                                <span className="text-base sm:text-lg font-bold uppercase tracking-wide">Total</span>
                                <span className='text-lg sm:text-2xl font-semibold tabular-nums'>${cabinPrice}</span>
                            </p>

                        </div>
                    </div>

                </div>

                <button
                    className="border border-primary-800 px-4 py-2 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={resetRange}
                    disabled={!hasValidRange}
                >
                    Clear
                </button>

            </div>

        </div >
    );
}

export default DateSelector;
