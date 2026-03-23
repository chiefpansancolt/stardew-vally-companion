"use client";

import { TabItem, Tabs } from "flowbite-react";
import { lostBooks, quests, secretNotes } from "stardew-valley-data";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { NAVY_TILE } from "@/data/constants/styles";
import { QuestsHero } from "@/comps/quests/QuestsHero";
import { LostBooksTab, QuestsTab, SecretNotesTab } from "@/comps/quests/tabs";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

const questCount = quests().get().length;
const noteCount = secretNotes().get().length;
const bookCount = lostBooks().get().length;

export default function QuestsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="quests" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Quests</h1>
				<p className="mt-1 text-gray-600">Quests, secret notes, and lost books</p>
			</div>

			<div className="flex flex-col gap-6">
				<QuestsHero gameData={activePlaythrough.data} />

				<Tabs variant="underline">
					<TabItem title={`Quests (${questCount})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<QuestsTab gameData={activePlaythrough.data} />
						</div>
					</TabItem>
					<TabItem title={`Secret Notes (${noteCount})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<SecretNotesTab gameData={activePlaythrough.data} />
						</div>
					</TabItem>
					<TabItem title={`Lost Books (${bookCount})`}>
						<div className="rounded-b-xl p-5" style={NAVY_TILE}>
							<LostBooksTab gameData={activePlaythrough.data} />
						</div>
					</TabItem>
				</Tabs>
			</div>
		</div>
	);
}
