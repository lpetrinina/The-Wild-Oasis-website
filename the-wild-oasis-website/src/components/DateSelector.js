'use client';

import { differenceInDays, isPast, isSameDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useReservation } from "./ReservationContext";
import { isAlreadyBooked } from "../lib/helpers/isAlreadyBooked";


function DateSelector({ cabin, settings, bookedDates }) {
    const { range, setRange, resetRange } = useReservation();

    const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

    const { minBookingLength, maxBookingLength } = settings;
    const { regularPrice, discount } = cabin;

    const numNights = differenceInDays(displayRange.to, displayRange.from);
    const cabinPrice = numNights * (regularPrice - discount);

    return (

        <div className="flex flex-col justify-between">
            <DayPicker
                className="pt-12 place-self-center px-4 text-sm sm:text-base"
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

            <div className="flex items-center justify-between px-4 sm:px-8 bg-accent-500 text-primary-800 h-18">

                <div className="flex items-center gap-4 sm:gap-6">

                    <p className="flex gap-1 sm:gap-2 items-baseline">
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

                    {numNights ? (
                        <>
                            <p className="bg-accent-600 px-2 py-1 sm:px-4 sm:py-2 text-xl sm:text-2xl">
                                <span>&times;</span> <span>{numNights}</span>
                            </p>
                            <p className="flex items-center sm:gap-1 flex-col sm:flex-row">
                                <span className="text-base sm:text-lg font-bold uppercase">Total</span>{" "}
                                <span className="text-lg sm:text-2xl font-semibold">${cabinPrice}</span>
                            </p>
                        </>
                    ) : null}
                </div>

                {range?.from || range?.to ? (
                    <button
                        className="border border-primary-800 px-2 py-1 sm:px-4 sm:py-2 text-sm font-semibold"
                        onClick={resetRange}
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default DateSelector;
