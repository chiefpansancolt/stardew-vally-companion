import type { CategorySectionProps } from "@/types";
import { chunkArray } from "@/lib/utils/formatting";
import { ItemTile } from "./ItemTile";

const CHUNK_SIZE = 70;

export function CategorySection({ title, items, isComplete }: CategorySectionProps) {
	const completedCount = items.filter(isComplete).length;
	const chunks = chunkArray(items, CHUNK_SIZE);

	return (
		<div
			className="border-secondary/60 rounded-xl border p-5"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
					{title}
				</h3>
				<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
					{completedCount} / {items.length}
				</span>
			</div>

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
		</div>
	);
}
