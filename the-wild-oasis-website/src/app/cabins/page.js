
export default async function CabinsPage() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();


    return (
        <div>
            <h3>Cabins Page</h3>
        </div>
    );
}
