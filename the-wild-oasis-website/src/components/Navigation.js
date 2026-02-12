"use client";

import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    {
        name: "Cabins",
        href: "/cabins",
    },
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Guest area",
        href: "/account",
    },
];

export default function Navigation() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleClose = function () {
        setOpen(false);
    };

    return (
        <nav className='z-10 text-xl'>

            <ul className='hidden md:flex gap-16 items-center'>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                className={`hover:text-accent-400 transition-colors 
                                ${isActive ? "text-accent-500" : ""}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Mobile button */}
            <div className='md:hidden relative z-50'>
                <button
                    className='hover:text-accent-400 relative h-6 w-6'
                    onClick={() => setOpen(!open)}
                >
                    <Bars3Icon
                        className={`absolute top-0  transition-all duration-300
                        ${open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
                    />

                    <XMarkIcon
                        className={`absolute top-0 transition-all duration-300
                        ${open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
                    />
                </button>
            </div>

            {/* Mobile navigation */}
            <div
                className={`md:hidden fixed inset-0 bg-primary-900/95 px-4 py-6 transition-all duration-700 ease-in-out 
                ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
            >
                <ul className='flex flex-col gap-4 items-center mt-16'>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <li key={link.name} className='text-lg'>
                                <Link
                                    href={link.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`${isActive ? "text-accent-500" : ""} hover:text-accent-400 transition-colors`}
                                    onClick={handleClose}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
