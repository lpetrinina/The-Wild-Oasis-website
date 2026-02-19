"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";

import { useReservation } from "./ReservationContext";

function ReservationReminder() {
    const { range, resetRange } = useReservation();

    if (!range.from || !range.to) return null;

    return (
        <div className='fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[310] sm:max-w-sm px-4 py-3 sm:px-6 rounded-full bg-accent-500/95 text-primary-800  shadow-xl shadow-slate-900 flex justify-between items-center '>

            <p className='text-sm sm:text-base leading-relaxed'>
                <span className="mr-1">👋</span>
                Don'f forget to reserve your dates <br />
                <span className="font-semibold">
                    from{" "} {format(new Date(range.from), "MMM dd")} to{" "}
                    {format(new Date(range.to), "MMM dd, yyyy")}
                </span>
            </p>

            <button
                className='rounded-full p-1 hover:bg-accent-600 transition-all'
                onClick={resetRange}
            >
                <XMarkIcon className='h-5 w-5' />
            </button>
        </div>
    );
}

export default ReservationReminder;
