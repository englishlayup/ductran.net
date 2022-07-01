import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Date from './date';

export default function SearchBox() {
	const [hits, setHits] = useState([]);

	const search = async (event: FormEvent) => {
		const q = (event.target as HTMLInputElement).value;
		if (q.length > 2) {
			const params = new URLSearchParams({ q });

			const res = await fetch('/api/search?' + params);

			const result = await res.json();
			setHits(result['posts']);
		}
	};

	return (
		<div className="flex justify-center">
			<div className="mb-3 w-full">
				<input
					onChange={search}
					type="search"
					className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded-full
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
					placeholder="Search"
				/>
				<ul>
					{hits.map((hit) => (
						<li
							key={hit.entityID}
							className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg text-sm"
						>
							<Link href={`/posts/${hit.filename}`}>
								<a>
									<strong>{hit.title}</strong> <br />
									<Date dateString={hit.date} />
								</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
