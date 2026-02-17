import Image from 'next/image';
import Link from 'next/link';
import { PencilSquareIcon, UsersIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import { MdBakeryDining } from "react-icons/md";

import DeleteReservation from './DeleteReservation';

export const formatDistanceFromNow = (dateStr) =>
    formatDistance(parseISO(dateStr), new Date(), {
        addSuffix: true,
    }).replace('about ', '');

function ReservationCard({ booking, onDelete }) {
    const {
        id,
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        totalPrice,
        hasBreakfast,
        cabins: { name, image },
    } = booking;


    return (
        <div className='grid grid-cols-1 md:grid-cols-[120px_1fr_auto] border border-primary-800'>
            <div className='relative aspect-video md:aspect-auto'>
                <Image
                    src={image}
                    alt={`Cabin ${name}`}
                    fill={true}
                    className='object-cover border-b md:border-b-0 md:border-r border-primary-800'
                />
            </div>

            <div className='flex flex-col gap-1 px-3 sm:px-6 py-3'>

                <div className='flex items-center justify-between mb-2'>

                    <h3 className='text-base sm:text-xl font-semibold'>
                        Cabin {name} ({numNights} nights)
                    </h3>

                    {isPast(new Date(startDate)) ? (
                        <span className='bg-yellow-800 text-yellow-200 h-5 sm:h-7 px-1.5 sm:px-3 uppercase text-[10px] sm:text-xs font-bold flex items-center rounded-sm'>
                            past
                        </span>
                    ) : (
                        <span className='bg-green-800 text-green-200 h-5 sm:h-7 px-1.5 sm:px-3 uppercase text-[10px] sm:text-xs font-bold flex items-center rounded-sm'>
                            upcoming
                        </span>
                    )}
                </div>

                <p className='text-sm sm:text-lg text-primary-300'>
                    {format(new Date(startDate), 'MMM dd')} (
                    {isToday(new Date(startDate))
                        ? 'Today'
                        : formatDistanceFromNow(startDate)}
                    ) &mdash; {format(new Date(endDate), 'MMM dd, yyyy')}
                </p>

                <div className='flex gap-5 mt-auto items-center'>
                    <p className='text-base sm:text-lg font-semibold text-accent-400 mt-1'>${totalPrice}</p>

                    <div className='flex items-center gap-1 sm:gap-2 '>
                        <UsersIcon className='h-5 w-5 text-primary-300' />

                        <p className='text-sm sm:text-lg text-primary-300  mt-1'>
                            {numGuests}
                            <span className='hidden xl:inline-block sm:ml-1'> guest{numGuests > 1 && 's'}</span>
                        </p>
                    </div>

                    {hasBreakfast &&
                        <div className='flex items-center gap-1 sm:gap-2'>
                            <MdBakeryDining className='h-7 w-7 text-primary-300' />
                            <p className='text-sm sm:text-lg text-primary-300 mt-1'>
                                breakfast
                            </p>
                        </div>
                    }
                    <p className='hidden sm:block ml-auto text-xs lg:text-sm text-primary-400 mt-1'>
                        Booked {format(new Date(created_at), 'MMM dd, p')}
                    </p>
                </div>
            </div>

            {/* Available for upcoming bookings */}
            <div className='flex flex-row justify-center md:flex-col border-t border-l-0 md:border-t-0 md:border-l border-primary-800 h-12 md:h-auto md:w-25'>

                {!isPast(new Date(startDate)) ?
                    <>
                        <Link
                            href={`/account/reservations/edit/${id}`}
                            className='group flex flex-1 items-center justify-center md:px-3 md:justify-start gap-2 uppercase text-xs font-bold text-primary-300 border-r border-b-0 md:border-b md:border-r-0 border-primary-800  hover:bg-accent-600 transition-colors hover:text-primary-900'
                        >
                            <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
                            <span className='mt-1'>Edit</span>
                        </Link>


                        <DeleteReservation bookingId={id} onDelete={onDelete} />
                    </>
                    : <p className='flex items-center text-primary-500 text-[10px] px-3'>Cannot change this reservation!</p>
                }
            </div>
        </div >
    );
}

export default ReservationCard;
