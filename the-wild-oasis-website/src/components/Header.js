import Logo from '@/src/components/Logo'
import Navigation from '@/src/components/Navigation'

function Header() {
    return (
        <header className='bg-primary-900/10 z-50 px-4 py-3 md:px-8 md:py-5'>

            <div className='flex justify-between items-center max-w-7xl mx-auto'>
                <Logo />
                <Navigation />
            </div>

        </header>
    );
}

export default Header;
