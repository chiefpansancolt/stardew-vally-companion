import type { CategorySectionProps } from "@/types";
import { chunkArray } from "@/lib/utils/formatting";
import { NavySection } from "@/comps/ui/NavySection";
import { ItemTile } from "./ItemTile";

const CHUNK_SIZE = 70;

export function CategorySection({ title, items, isComplete }: CategorySectionProps) {
	const completedCount = items.filter(isComplete).length;
	const chunks = chunkArray(items, CHUNK_SIZE);

	return (
		<NavySection title={title} badge={`${completedCount} / ${items.length}`}>
			<div className="space-y-3">
				{chunks.map((chunkItems, ci) => (
					<div key={ci}>
						{ci > 0 && <div className="mb-3 border-t border-white/15" />}
						<div className="grid grid-cols-10 gap-1.5">
							{chunkItems.map((item) => (
								<ItemTile key={item.id} item={item} complete={isComplete(item)} />
							))}
						</div>
					</div>
				))}
			</div>
		</NavySection>
	);
}
