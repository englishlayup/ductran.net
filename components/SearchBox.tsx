import { FormEvent, useState } from "react";

export default function SearchBox() {
    const [hits, setHits] = useState([]);

    const search = async (event: FormEvent) => {
        const q = (event.target as HTMLInputElement).value;
        console.log(q)
        if (q.length > 2) {
            const params = new URLSearchParams({ q });

            const res = await fetch('/api/search?' + params);

            const result = await res.json();
            console.log(result);
            setHits(result['posts'])
        }
    };

    return (
        <div>
            <input onChange={search} type="text" />
            <ul>
                {hits.map((hit) => (
                    <li key={hit.entityID}>
                        {hit.title} {hit.description}
                    </li>
                ))}
            </ul>
        </div>);
}
