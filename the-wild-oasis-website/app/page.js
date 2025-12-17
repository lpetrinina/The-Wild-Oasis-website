import Link from "next/link";
import Navigation from "./components/Navigation";

export default function Home() {
    return (
        <div>
            <Navigation />
            <h1>Home page</h1>

            <Link href="/cabins"> Explore luxury cabins!</Link>
        </div>
    );
}
