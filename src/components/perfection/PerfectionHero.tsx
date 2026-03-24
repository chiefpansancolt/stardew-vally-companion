"use client";

import { FaTrophy } from "react-icons/fa";
import type { CategoryProgress } from "@/lib/pages/perfection";
import { StatTile } from "@/comps/ui/StatTile";

interface Props {
	categories: CategoryProgress[];
	score: number;
	waivers: number;
}

export function PerfectionHero({ categories, score, waivers }: Props) {
	const complete = categories.filter((c) => c.current >= c.total).length;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center gap-3">
				<FaTrophy className="h-7 w-7 text-gray-400" />
				<div>
					<div className="text-lg font-bold text-gray-900">Perfection</div>
					<div className="mt-0.5 text-sm text-gray-500">
						Track your progress toward 100% game completion
					</div>
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile
					label="Perfection Score"
					value={`${score}%`}
					valueColor={score >= 100 ? "text-green-600" : "text-accent"}
				/>
				<StatTile
					label="Categories Complete"
					value={complete}
					valueColor={complete === categories.length ? "text-green-600" : "text-accent"}
					suffix={`/ ${categories.length}`}
				/>
				<StatTile label="Waivers Used" value={waivers} valueColor="text-accent" />
			</div>
		</div>
	);
}
