"use client";

import { crafting } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { CraftingEditStepProps } from "@/types";
import type { CraftingRecipe } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

const allRecipes = crafting().sortByName().get();

export function CraftingEditStep({ craftingRecipes, onChange }: CraftingEditStepProps) {
	const [local, setLocal] = useState(craftingRecipes);
	const [search, setSearch] = useState("");

	function setStatus(name: string, learned: boolean, crafted: boolean) {
		const next: Record<string, CraftingRecipe> = { ...local, [name]: { learned, crafted } };
		if (!learned && !crafted) delete next[name];
		setLocal(next);
		onChange(next);
	}

	const filtered = allRecipes.filter(
		(r) => !search || r.name.toLowerCase().includes(search.toLowerCase())
	);

	const learnedCount = allRecipes.filter((r) => local[r.name]?.learned).length;
	const craftedCount = allRecipes.filter((r) => local[r.name]?.crafted).length;

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex gap-3">
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{learnedCount} / {allRecipes.length} learned
					</span>
					<span className="rounded-full bg-gray-100 px-3 py-0.5 text-[0.7rem] font-semibold text-gray-600">
						{craftedCount} / {allRecipes.length} crafted
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
				{filtered.map((recipe) => {
					const learned = Boolean(local[recipe.name]?.learned);
					const crafted = Boolean(local[recipe.name]?.crafted);
					return (
						<div
							key={recipe.name}
							className={`flex items-center gap-3 rounded-xl border p-2.5 ${
								crafted
									? "border-accent/40 bg-accent/5"
									: learned
										? "border-primary/30 bg-primary/5"
										: "border-gray-200 bg-gray-50"
							}`}
						>
							<img
								src={assetPath(recipe.image)}
								alt={recipe.name}
								className="h-8 w-8 shrink-0 object-contain"
							/>
							<div className="min-w-0 flex-1 text-xs font-bold text-gray-700">
								{recipe.name}
							</div>
							<div className="flex shrink-0 gap-1">
								<button
									type="button"
									onClick={() =>
										setStatus(
											recipe.name,
											!learned,
											crafted && !learned ? false : crafted
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
										setStatus(recipe.name, crafted ? learned : true, !crafted)
									}
									className={`cursor-pointer rounded border px-1.5 py-0.5 text-[0.6rem] font-semibold transition-colors ${
										crafted
											? "border-accent/40 bg-accent/10 text-accent"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-100"
									}`}
								>
									{crafted ? (
										<HiCheck className="inline h-3 w-3" />
									) : (
										<HiLockClosed className="inline h-3 w-3" />
									)}{" "}
									Crafted
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
