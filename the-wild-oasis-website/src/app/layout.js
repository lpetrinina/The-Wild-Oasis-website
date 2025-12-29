import Logo from "@/src/components/Logo";
import Navigation from "@/src/components/Navigation";

import "@/src/styles/globals.css";
import { Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
    subsets: ['latin'],
    display: 'swap'
});


export const metadata = {
    title: {
        template: '%s / The Wild Oasis',
        default: 'Welcome / The Wild Oasis'
    },
    description: 'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.'
};



export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={`${josefin.className} bg-primary-900 text-gray-50 min-h-screen`}>
                <header>
                    <Logo />
                    <Navigation />
                </header>

                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
