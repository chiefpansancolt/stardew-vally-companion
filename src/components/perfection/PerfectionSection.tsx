"use client";

import type { CategoryProgress } from "@/lib/pages/perfection";
import { NavySection } from "@/comps/ui/NavySection";
import { PerfectionRow } from "./cards";

interface Props {
	categories: CategoryProgress[];
}

export function PerfectionSection({ categories }: Props) {
	const complete = categories.filter((c) => c.current >= c.total).length;

	return (
		<NavySection title="Categories" badge={`${complete} / ${categories.length} complete`}>
			<ul className="flex flex-col gap-2">
				{categories.map((cat) => (
					<PerfectionRow key={cat.id} category={cat} />
				))}
			</ul>
		</NavySection>
	);
}
