"use client";

import { lostBooks, quests, secretNotes, specialOrders } from "stardew-valley-data";
import { FaScroll } from "react-icons/fa";
import type { CollectionProps as Props } from "@/types";
import { StatTile } from "@/comps/ui/StatTile";

const allQuests = quests().get();
const allSpecialOrders = specialOrders().get();
const townOrders = allSpecialOrders.filter((o) => o.type === "town");
const qiOrders = allSpecialOrders.filter((o) => o.type === "qi");
const allNotes = secretNotes().get();
const notes = allNotes.filter((n) => n.type === "secret-note");
const scraps = allNotes.filter((n) => n.type === "journal-scrap");
const allBooks = lostBooks().get();

export function QuestsHero({ gameData }: Props) {
	const questsComplete = allQuests.filter((q) => gameData.questsCompleted[q.id]).length;
	const townComplete = townOrders.filter((o) => gameData.specialOrdersCompleted[o.id]).length;
	const qiComplete = qiOrders.filter((o) => gameData.specialOrdersCompleted[o.id]).length;
	const notesFound = notes.filter((n) => gameData.secretNotes[n.id]).length;
	const scrapsFound = scraps.filter((n) => gameData.secretNotes[n.id]).length;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaScroll className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Quests & Discovery</div>
					<div className="mt-0.5 text-sm text-gray-500">
						Quests, secret notes, and lost books
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}
			>
				<StatTile label="Main Quests" value={allQuests.length} valueColor="text-accent" />
				<StatTile
					label="Special Orders"
					value={townComplete}
					valueColor="text-accent"
					suffix={`/ ${townOrders.length}`}
				/>
				<StatTile
					label="Qi Orders"
					value={qiComplete}
					valueColor="text-accent"
					suffix={`/ ${qiOrders.length}`}
				/>
				<StatTile
					label="Help Wanted"
					value={gameData.helpWantedCompleted}
					valueColor="text-accent"
				/>
				<StatTile
					label="Secret Notes"
					value={notesFound}
					valueColor="text-accent"
					suffix={`/ ${notes.length}`}
				/>
				<StatTile
					label="Journal Scraps"
					value={scrapsFound}
					valueColor="text-accent"
					suffix={`/ ${scraps.length}`}
				/>
				<StatTile
					label="Lost Books"
					value={gameData.lostBooksFound}
					valueColor="text-accent"
					suffix={`/ ${allBooks.length}`}
				/>
			</div>
		</div>
	);
}
