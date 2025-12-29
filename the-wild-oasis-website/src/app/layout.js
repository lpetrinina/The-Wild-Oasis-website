import Header from "../components/Header";

import "@/src/styles/globals.css";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: {
        template: "%s / The Wild Oasis",
        default: "Welcome / The Wild Oasis",
    },
    description:
        "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body
                className={`${josefin.className} bg-primary-950 text-gray-50 antialiased min-h-screen flex flex-col relative`}
            >
                <Header />

                <div className='flex-1 px-8 py-12'>
                    <main className='max-w-7xl mx-auto'>{children}</main>
                </div>
            </body>
        </html>
    );
}
