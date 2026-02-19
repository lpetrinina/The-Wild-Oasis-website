import SelectCountry from "@/src/components/SelectCountry";
import UpdateProfileForm from "@/src/components/UpdateProfileForm";

import { auth } from "@/src/lib/auth";
import { getGuest } from "@/src/lib/data-service";

export const metadata = {
    title: 'Update profile'
};

export default async function Page() {

    const session = await auth();
    const guest = await getGuest(session.user.email);

    return (
        <div>
            <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4">
                Update your guest profile
            </h2>

            <p className="text-base sm:text-lg mb-6 sm:mb-8 text-primary-200">
                Providing the following information will make your check-in process
                faster and smoother. See you soon!
            </p>

            <UpdateProfileForm guest={guest}>
                <SelectCountry
                    name="nationality"
                    id="nationality"
                    className="px-4 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                    defaultCountry={guest.nationality}
                />
            </UpdateProfileForm>
        </div>
    );
}
