"use client";

import { lostBooks, secretNotes } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { NotesBooksEditStepProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

const allNotes = secretNotes().get();
const allBooks = lostBooks().get();

const INPUT =
	"w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const LABEL = "mb-1 block text-xs font-semibold text-gray-500";

export function NotesBooksEditStep({
	secretNotes: initialNotes,
	lostBooks: initialBooks,
	lostBooksFound,
	onNotesChange,
	onBooksChange,
	onLostBooksFoundChange,
}: NotesBooksEditStepProps) {
	const [localNotes, setLocalNotes] = useState(initialNotes);
	const [localBooks, setLocalBooks] = useState(initialBooks);
	const [localFound, setLocalFound] = useState(lostBooksFound);

	function toggleNote(id: string) {
		const next = { ...localNotes, [id]: !localNotes[id] };
		setLocalNotes(next);
		onNotesChange(next);
	}

	function toggleBook(id: string) {
		const next = { ...localBooks, [id]: !localBooks[id] };
		setLocalBooks(next);
		onBooksChange(next);
	}

	function handleFound(value: number) {
		setLocalFound(value);
		onLostBooksFoundChange(value);
	}

	const notesFound = allNotes.filter((n) => localNotes[n.id]).length;
	const booksFound = allBooks.filter((b) => localBooks[b.id]).length;

	return (
		<div className="space-y-6">
			<div>
				<div className="mb-3 flex items-center justify-between">
					<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
						Secret Notes
					</p>
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{notesFound} / {allNotes.length} found
					</span>
				</div>
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
					{allNotes.map((note) => {
						const found = Boolean(localNotes[note.id]);
						return (
							<button
								key={note.id}
								type="button"
								onClick={() => toggleNote(note.id)}
								className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 text-left transition-colors ${
									found
										? "border-accent/40 bg-accent/5 hover:bg-accent/10"
										: "border-gray-200 bg-gray-50 hover:border-gray-300"
								}`}
							>
								<div className="min-w-0 flex-1">
									<div
										className={`text-xs font-bold ${found ? "text-accent" : "text-gray-700"}`}
									>
										{note.name}
									</div>
								</div>
								{found ? (
									<HiCheck className="text-accent h-3.5 w-3.5 shrink-0" />
								) : (
									<HiLockClosed className="h-3.5 w-3.5 shrink-0 text-gray-400" />
								)}
							</button>
						);
					})}
				</div>
			</div>

			<div>
				<div className="mb-3 flex items-center justify-between">
					<p className="text-xs font-bold tracking-wide text-gray-500 uppercase">
						Lost Books
					</p>
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{booksFound} / {allBooks.length} found
					</span>
				</div>
				<div className="mb-4 max-w-xs">
					<label className={LABEL}>Books Found (counter)</label>
					<input
						type="number"
						min={0}
						max={allBooks.length}
						value={localFound}
						onChange={(e) => handleFound(Number(e.target.value))}
						className={INPUT}
					/>
				</div>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{allBooks.map((book) => {
						const found = Boolean(localBooks[book.id]);
						return (
							<button
								key={book.id}
								type="button"
								onClick={() => toggleBook(book.id)}
								className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
									found
										? "border-accent/40 bg-accent/5 hover:bg-accent/10"
										: "border-gray-200 bg-gray-50 hover:border-gray-300"
								}`}
							>
								<img
									src={assetPath(book.image)}
									alt={book.name}
									className="mt-0.5 h-7 w-7 shrink-0 object-contain"
								/>
								<div className="min-w-0 flex-1">
									<div
										className={`mb-0.5 text-xs font-bold ${found ? "text-accent" : "text-gray-700"}`}
									>
										{book.name}
									</div>
									{found ? (
										<span className="bg-accent/20 text-accent inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.625rem] font-bold">
											<HiCheck className="h-3 w-3" /> Found
										</span>
									) : (
										<span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[0.625rem] font-bold text-gray-500">
											<HiLockClosed className="h-3 w-3" /> Not Found
										</span>
									)}
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
