"use client";

import {
    CalendarDaysIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    HomeIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    {
        name: "Home",
        href: "/account",
        icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
    },
    {
        name: "Reservations",
        href: "/account/reservations",
        icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
    },
    {
        name: "Guest profile",
        href: "/account/profile",
        icon: <UserIcon className='h-5 w-5 text-primary-600' />,
    },
];

function SideNavigation() {
    const pathname = usePathname();


    return (

        <nav
            className={'h-full bg-primary-950  border-r border-primary-900'}
        >

            <ul className='flex flex-col gap-2 h-full text-lg'>
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link
                            className={`py-3 px-3 lg:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center sm:gap-4 font-semibold  
                                ${pathname === link.href ? "bg-primary-900" : ""}`}
                            href={link.href}
                        >
                            {link.icon}

                            <span className="hidden lg:inline-block">{link.name}</span>

                        </Link>
                    </li>
                ))}

                <li className='mt-auto'>
                    <SignOutButton />
                </li>
            </ul>
        </nav>

    );
}

export default SideNavigation;
