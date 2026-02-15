"use client";

import { useFormStatus } from "react-dom";


function SubmitButton({ children, pendingLabel = 'Updating...', disabled }) {
    const { pending } = useFormStatus();

    const isDisabled = pending || disabled;

    return (
        <button className='cursor-pointer bg-accent-500 px-6 py-3 sm:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-accent-300 disabled:text-primary-600'
            disabled={isDisabled}
        >
            {pending ? pendingLabel : children}
        </button>
    )
}

export default SubmitButton;



