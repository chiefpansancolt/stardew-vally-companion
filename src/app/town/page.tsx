"use client";

import { TownSection } from "@/comps/town/TownSection";

export default function TownPage() {
	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Town</h1>
				<p className="mt-1 text-gray-600">
					Locations, shops, and hours throughout the valley
				</p>
			</div>

			<TownSection />
		</div>
	);
}
