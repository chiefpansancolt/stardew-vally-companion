"use client";

import { lostBooks } from "stardew-valley-data";
import { useState } from "react";
import type { CollectionProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";

const allBooks = lostBooks().get();

export function LostBooksTab({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const filtered = allBooks.filter(
		(b) => !search || b.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<NavySection
			title="Lost Books"
			badge={`${gameData.lostBooksFound} / ${allBooks.length} found`}
		>
			<div className="mb-4 flex flex-wrap items-center gap-3">
				<SearchField value={search} onChange={setSearch} placeholder="Search books…" />
			</div>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((book) => (
					<div
						key={book.id}
						className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
					>
						<img
							src={assetPath(book.image)}
							alt="Lost Book"
							className="h-10 w-10 shrink-0 object-contain"
						/>
						<div className="min-w-0 flex-1">
							<span className="text-[0.8rem] font-bold text-white">{book.name}</span>
							<div className="mt-1 line-clamp-3 text-[0.6rem] leading-relaxed text-white/80">
								{book.description}
							</div>
						</div>
					</div>
				))}
			</div>
		</NavySection>
	);
}
