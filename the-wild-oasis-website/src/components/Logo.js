import Image from "next/image";
import Link from "next/link";

import logo from '@/public/logo.png'

function Logo() {

    return (
        <Link href='/' className='flex items-center gap-4 z-10'>
            <div className="w-13 md:w-15 aspect-square">
                <Image src={logo} className="object-cover" alt='The Wild Oasis logo' loading="eager" />

            </div>

            <span className='text-lg md:text-xl font-semibold text-primary-100'>
                The Wild Oasis
            </span>
        </Link>
    );
}

export default Logo;
