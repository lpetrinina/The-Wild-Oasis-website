import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../lib/actions";

function SignOutButton() {
    return (
        <form action={signOutAction}>
            <button className='py-3 px-3 lg:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full'>
                <ArrowRightEndOnRectangleIcon className='h-5 w-5 text-primary-600' />
                <span className="hidden lg:inline-block">Sign out</span>
            </button>
        </form>
    );
}

export default SignOutButton;
