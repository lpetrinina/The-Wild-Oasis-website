"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeFilter = searchParams.get("capacity") ?? "all";

    const handleFilter = function (filter) {
        const params = new URLSearchParams(searchParams);
        params.set("capacity", filter);

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className='flex border border-primary-700 '>
            <Button
                filter='all'
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                <span>All cabins</span>
            </Button>

            <Button
                filter='small'
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                <span>1 &mdash;3 guests</span>
            </Button>

            <Button
                filter='medium'
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                <span>4 &mdash;7 guests</span>
            </Button>

            <Button
                filter='large'
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                <span>8 &mdash;12 guests</span>
            </Button>
        </div>
    );
}

function Button({ children, filter, handleFilter, activeFilter }) {
    return (
        <button
            className={`px-3 py-1.5 sm:px-5 sm:py-2 text-sm md:text-base hover:bg-primary-700 ${activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
                }`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    );
}

export default Filter;
