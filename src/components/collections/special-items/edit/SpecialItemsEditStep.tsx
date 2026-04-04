"use client";

import { specialItems } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { SpecialItemsEditStepProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

const allItems = specialItems().get();
const specialItemsList = allItems.filter((i) => i.type === "special-item");
const booksList = allItems.filter((i) => i.type === "book");

export function SpecialItemsEditStep({
	specialItems: initialSpecialItems,
	books: initialBooks,
	onSpecialItemsChange,
	onBooksChange,
}: SpecialItemsEditStepProps) {
	const [localSpecial, setLocalSpecial] = useState(new Set(initialSpecialItems));
	const [localBooks, setLocalBooks] = useState(new Set(initialBooks));
	const [search, setSearch] = useState("");

	function toggleSpecialItem(id: string) {
		const next = new Set(localSpecial);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		setLocalSpecial(next);
		onSpecialItemsChange([...next]);
	}

	function toggleBook(id: string) {
		const next = new Set(localBooks);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		setLocalBooks(next);
		onBooksChange([...next]);
	}

	const q = search.toLowerCase();
	const filteredSpecial = specialItemsList.filter((i) => !q || i.name.toLowerCase().includes(q));
	const filteredBooks = booksList.filter((i) => !q || i.name.toLowerCase().includes(q));

	function ItemButton({
		id,
		name,
		image,
		acquired,
		onToggle,
	}: {
		id: string;
		name: string;
		image: string;
		acquired: boolean;
		onToggle: () => void;
	}) {
		return (
			<button
				type="button"
				onClick={onToggle}
				className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2 text-left transition-colors ${
					acquired
						? "border-accent/40 bg-accent/5 hover:bg-accent/10"
						: "border-gray-200 bg-gray-50 hover:border-gray-300"
				}`}
			>
				<img
					src={assetPath(image)}
					alt={name}
					className="h-8 w-8 shrink-0 object-contain"
				/>
				<div
					className={`min-w-0 flex-1 text-[0.65rem] leading-tight font-bold ${acquired ? "text-accent" : "text-gray-700"}`}
				>
					{name}
				</div>
				{acquired ? (
					<HiCheck className="text-accent h-3.5 w-3.5 shrink-0" />
				) : (
					<HiLockClosed className="h-3.5 w-3.5 shrink-0 text-gray-400" />
				)}
			</button>
		);
	}

	return (
		<div className="space-y-5">
			<div className="flex items-center justify-between gap-2">
				<div className="flex gap-3">
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{localSpecial.size} / {specialItemsList.length} powers
					</span>
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{localBooks.size} / {booksList.length} books
					</span>
				</div>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search items…"
					className="focus:border-primary rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none"
				/>
			</div>

			{filteredSpecial.length > 0 && (
				<div className="space-y-2">
					<p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
						Special Powers
					</p>
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
						{filteredSpecial.map((item) => (
							<ItemButton
								key={item.id}
								id={item.id}
								name={item.name}
								image={item.image}
								acquired={localSpecial.has(item.id)}
								onToggle={() => toggleSpecialItem(item.id)}
							/>
						))}
					</div>
				</div>
			)}

			{filteredBooks.length > 0 && (
				<div className="space-y-2">
					<p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
						Books
					</p>
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
						{filteredBooks.map((item) => (
							<ItemButton
								key={item.id}
								id={item.id}
								name={item.name}
								image={item.image}
								acquired={localBooks.has(item.id)}
								onToggle={() => toggleBook(item.id)}
							/>
						))}
					</div>
				</div>
			)}

			<p className="text-[0.65rem] text-gray-400">
				Mastery items are managed on the Character page.
			</p>
		</div>
	);
}
