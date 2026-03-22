"use client";

import { specialItems } from "stardew-valley-data";
import { HiBookOpen } from "react-icons/hi";
import type { CollectionProps as Props } from "@/types";
import { isSpecialItemAcquired } from "@/lib/pages/special-items";
import { StatTile } from "@/comps/ui/StatTile";

const allItems = specialItems().get();
const specialCount = allItems.filter((i) => i.type === "special-item").length;
const bookCount = allItems.filter((i) => i.type === "book").length;
const masteryCount = allItems.filter((i) => i.type === "mastery").length;
const trackableTotal = specialCount + bookCount + masteryCount;

export function SpecialItemsHero({ gameData }: Props) {
	const specialAcquired = allItems.filter(
		(i) => i.type === "special-item" && isSpecialItemAcquired(i, gameData) === true
	).length;
	const booksRead = allItems.filter(
		(i) => i.type === "book" && isSpecialItemAcquired(i, gameData) === true
	).length;
	const masteryUnlocked = allItems.filter(
		(i) => i.type === "mastery" && isSpecialItemAcquired(i, gameData) === true
	).length;
	const totalAcquired = specialAcquired + booksRead + masteryUnlocked;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<HiBookOpen className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Special Items</div>
					<div className="mt-0.5 text-sm text-gray-500">
						Powers, books, and mastery unlocks
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile
					label="Special Items"
					value={specialAcquired}
					valueColor={specialAcquired === specialCount ? "text-green-600" : "text-accent"}
					suffix={`/ ${specialCount}`}
				/>
				<StatTile
					label="Books"
					value={booksRead}
					valueColor={booksRead === bookCount ? "text-green-600" : "text-accent"}
					suffix={`/ ${bookCount}`}
				/>
				<StatTile
					label="Mastery"
					value={masteryUnlocked}
					valueColor={masteryUnlocked === masteryCount ? "text-green-600" : "text-accent"}
					suffix={`/ ${masteryCount}`}
				/>
				<StatTile
					label="Total"
					value={totalAcquired}
					valueColor={totalAcquired === trackableTotal ? "text-green-600" : "text-accent"}
					suffix={`/ ${trackableTotal}`}
				/>
			</div>
		</div>
	);
}
