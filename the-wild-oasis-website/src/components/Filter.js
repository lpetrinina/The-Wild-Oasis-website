'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();


    const handleFilter = function (filter) {
        const params = new URLSearchParams(searchParams);
        params.set('capacity', filter);

        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    return (
        <div className="flex gap-2 ">
            <button className="px-5 py-2 hover:bg-primary-700" onClick={() => handleFilter('all')}>All cabins</button>
            <button className="px-5 py-2 hover:bg-primary-700" onClick={() => handleFilter('small')}>1&mdash;3 guests</button>
            <button className="px-5 py-2 hover:bg-primary-700" onClick={() => handleFilter('medium')}>4&mdash;7 guests</button>
            <button className="px-5 py-2 hover:bg-primary-700" onClick={() => handleFilter('large')}>8&mdash;12 guests</button>
        </div>
    )
}

export default Filter
