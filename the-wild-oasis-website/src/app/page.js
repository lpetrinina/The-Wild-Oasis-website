import Link from "next/link";

export default function Home() {
    return (
        <div>

            <h1>Home page</h1>

            <Link href="/cabins"> Explore luxury cabins!</Link>
        </div>
    );
}
