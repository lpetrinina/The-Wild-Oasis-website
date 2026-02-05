"use client";

import { useFormStatus } from "react-dom";


function SubmitButton({ children, pendingLabel = 'Updating...', disabled }) {
    const { pending } = useFormStatus();

    const isDisabled = pending || disabled;

    return (
        <button className='cursor-pointer bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
            disabled={isDisabled}
        >
            {pending ? pendingLabel : children}
        </button>
    )
}

export default SubmitButton;



