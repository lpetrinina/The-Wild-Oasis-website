import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon, ClockIcon } from "@heroicons/react/24/solid";

import TextExpander from "./TextExpander";

import { getSettings } from "../lib/data-service";

async function Cabin({ cabin }) {

    const { name, maxCapacity, image, description } = cabin;
    const { minBookingLength } = await getSettings();

    return (

        <div className='grid grid-cols-1 sm:grid-cols-[3fr_4fr] gap-8 md:gap-16 border border-primary-800 px-4 sm:px-10 py-5 mb-16 sm:mb-24'>


            <div className='relative aspect-4/3 sm:aspect-auto sm:scale-[1.15] sm:-translate-x-3'>
                <Image src={image} fill={true} alt={`Cabin ${name}`} className="object-cover" />
            </div>

            <div className="relative">
                <h3 className='bg-primary-950/95 mb-5 p-3 sm:p-6 pb-1 w-fit sm:w-[150%] text-accent-100 font-black text-[40px] sm:text-6xl md:text-7xl absolute -top-52 sm:static sm:-translate-x-63.5'>
                    Cabin {name}
                </h3>

                <p className='text-base md:text-lg text-primary-300 mb-6 sm:mb-10 '>
                    <TextExpander>
                        {description}
                    </TextExpander>
                </p>

                <ul className='flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-7'>
                    <li className='flex gap-3 items-center'>
                        <UsersIcon className='h-5 w-5 text-primary-600' />
                        <span className='text-base md:text-lg'>
                            For up to <span className='font-bold'>{maxCapacity}</span>{" "}
                            guests
                        </span>
                    </li>
                    <li className='flex gap-3 items-center'>
                        <MapPinIcon className='h-5 w-5 text-primary-600' />
                        <span className='text-base md:text-lg'>
                            Located in the heart of the{" "}
                            <span className='font-bold'>Dolomites</span> (Italy)
                        </span>
                    </li>
                    <li className='flex gap-3 items-center'>
                        <EyeSlashIcon className='h-5 w-5 text-primary-600' />
                        <span className='text-base md:text-lg'>
                            Privacy <span className='font-bold '>100%</span> guaranteed
                        </span>
                    </li>
                    <li className='flex gap-3 items-center'>
                        <ClockIcon className='h-5 w-5 text-primary-600' />
                        <span className='text-base md:text-lg'>
                            Reserve for <span className='font-bold'>{minBookingLength + 1}+</span> nights
                        </span>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default Cabin;



