"use client";

import { cooking } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { CookingEditStepProps } from "@/types";
import type { CookingRecipe } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

const allDishes = cooking().sortByName().get();

export function CookingEditStep({ cookingRecipes, onChange }: CookingEditStepProps) {
	const [local, setLocal] = useState(cookingRecipes);
	const [search, setSearch] = useState("");

	function setStatus(name: string, learned: boolean, cooked: boolean) {
		const next: Record<string, CookingRecipe> = { ...local, [name]: { learned, cooked } };
		if (!learned && !cooked) delete next[name];
		setLocal(next);
		onChange(next);
	}

	const filtered = allDishes.filter(
		(d) => !search || d.name.toLowerCase().includes(search.toLowerCase())
	);

	const learnedCount = allDishes.filter((d) => local[d.name]?.learned).length;
	const cookedCount = allDishes.filter((d) => local[d.name]?.cooked).length;

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex gap-3">
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{learnedCount} / {allDishes.length} learned
					</span>
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{cookedCount} / {allDishes.length} cooked
					</span>
				</div>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search recipes…"
					className="focus:border-primary rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none"
				/>
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
				{filtered.map((dish) => {
					const learned = Boolean(local[dish.name]?.learned);
					const cooked = Boolean(local[dish.name]?.cooked);
					return (
						<div
							key={dish.name}
							className={`flex items-center gap-3 rounded-xl border p-2.5 ${
								cooked
									? "border-accent/40 bg-accent/5"
									: learned
										? "border-primary/30 bg-primary/5"
										: "border-gray-200 bg-gray-50"
							}`}
						>
							<img
								src={assetPath(dish.image)}
								alt={dish.name}
								className="h-8 w-8 shrink-0 object-contain"
							/>
							<div className="min-w-0 flex-1 text-xs font-bold text-gray-700">
								{dish.name}
							</div>
							<div className="flex shrink-0 gap-1">
								<button
									type="button"
									onClick={() =>
										setStatus(
											dish.name,
											!learned,
											cooked && !learned ? false : cooked
										)
									}
									className={`cursor-pointer rounded border px-1.5 py-0.5 text-[0.6rem] font-semibold transition-colors ${
										learned
											? "border-primary/40 bg-primary/10 text-primary"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-100"
									}`}
								>
									{learned ? (
										<HiCheck className="inline h-3 w-3" />
									) : (
										<HiLockClosed className="inline h-3 w-3" />
									)}{" "}
									Learned
								</button>
								<button
									type="button"
									onClick={() =>
										setStatus(dish.name, cooked ? learned : true, !cooked)
									}
									className={`cursor-pointer rounded border px-1.5 py-0.5 text-[0.6rem] font-semibold transition-colors ${
										cooked
											? "border-accent/40 bg-accent/10 text-accent"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-100"
									}`}
								>
									{cooked ? (
										<HiCheck className="inline h-3 w-3" />
									) : (
										<HiLockClosed className="inline h-3 w-3" />
									)}{" "}
									Cooked
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
