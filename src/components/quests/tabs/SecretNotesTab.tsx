"use client";

import { secretNotes } from "stardew-valley-data";
import { useState } from "react";
import type { CollectionProps as Props } from "@/types";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { StatusBadge } from "@/comps/ui/StatusBadge";

const allNotes = secretNotes().get();
const notes = allNotes.filter((n) => n.type === "secret-note");
const scraps = allNotes.filter((n) => n.type === "journal-scrap");

export function SecretNotesTab({ gameData }: Props) {
	const [noteSearch, setNoteSearch] = useState("");
	const [scrapSearch, setScrapSearch] = useState("");

	const filteredNotes = notes.filter(
		(n) => !noteSearch || n.name.toLowerCase().includes(noteSearch.toLowerCase())
	);
	const filteredScraps = scraps.filter(
		(n) => !scrapSearch || n.name.toLowerCase().includes(scrapSearch.toLowerCase())
	);

	const notesFound = notes.filter((n) => gameData.secretNotes[n.id]).length;
	const scrapsFound = scraps.filter((n) => gameData.journalScraps[n.id]).length;

	return (
		<div className="flex flex-col gap-4">
			<NavySection title="Secret Notes" badge={`${notesFound} / ${notes.length} found`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={noteSearch}
						onChange={setNoteSearch}
						placeholder="Search notes…"
					/>
				</div>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{filteredNotes.map((note) => {
						const found = !!gameData.secretNotes[note.id];
						return (
							<div
								key={note.id}
								className={`flex flex-col gap-1.5 rounded-lg border p-3 ${
									found
										? "border-green-400/30 bg-green-400/10"
										: "border-white/10 bg-white/5"
								}`}
							>
								<div className="flex items-center justify-between gap-2">
									<span
										className={`text-[0.8rem] font-bold ${found ? "text-green-300" : "text-white/80"}`}
									>
										{note.name}
									</span>
									<StatusBadge
										status={found ? "success" : "inactive"}
										label={found ? "Found" : "Not Found"}
									/>
								</div>
								<div className="line-clamp-3 text-[0.6rem] leading-relaxed text-white/80">
									{note.description}
								</div>
							</div>
						);
					})}
				</div>
			</NavySection>

			<NavySection title="Journal Scraps" badge={`${scrapsFound} / ${scraps.length} found`}>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={scrapSearch}
						onChange={setScrapSearch}
						placeholder="Search scraps…"
					/>
				</div>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{filteredScraps.map((scrap) => {
						const found = !!gameData.journalScraps[scrap.id];
						return (
							<div
								key={scrap.id}
								className={`flex flex-col gap-1.5 rounded-lg border p-3 ${
									found
										? "border-green-400/30 bg-green-400/10"
										: "border-white/10 bg-white/5"
								}`}
							>
								<div className="flex items-center justify-between gap-2">
									<span
										className={`text-[0.8rem] font-bold ${found ? "text-green-300" : "text-white/80"}`}
									>
										{scrap.name}
									</span>
									<StatusBadge
										status={found ? "success" : "inactive"}
										label={found ? "Found" : "Not Found"}
									/>
								</div>
								<div className="line-clamp-3 text-[0.6rem] leading-relaxed text-white/80">
									{scrap.description}
								</div>
							</div>
						);
					})}
				</div>
			</NavySection>
		</div>
	);
}
