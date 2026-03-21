"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { ForageablesHero } from "@/comps/collections/forageables/ForageablesHero";
import { ForageablesSection } from "@/comps/collections/forageables/ForageablesSection";
import { TreesSection } from "@/comps/collections/forageables/TreesSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function ForageablesPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="forageables" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Forageables</h1>
				<p className="mt-1 text-gray-600">
					Wild-gathered items, tree produce, and tapper goods with sell prices and artisan
					uses.
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<ForageablesHero gameData={activePlaythrough.data} />
				<ForageablesSection gameData={activePlaythrough.data} />
				<TreesSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
