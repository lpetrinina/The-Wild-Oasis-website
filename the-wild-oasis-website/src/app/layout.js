import Logo from "@/src/components/Logo";
import Navigation from "@/src/components/Navigation";

import "@/src/styles/globals.css"


export const metadata = {
    title: 'The Wild Oasis'
};



export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className="bg-primary-900 text-gray-50 min-h-screen">
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
