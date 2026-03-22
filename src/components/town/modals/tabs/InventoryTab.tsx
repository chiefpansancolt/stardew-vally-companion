import type { InventoryTabProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { NAVY_TILE } from "@/data/constants/styles";

export function InventoryTab({ items }: Props) {
	if (items.length === 0) {
		return <p className="py-4 text-center text-sm text-gray-400">No items available.</p>;
	}

	return (
		<div className="rounded-lg p-3" style={NAVY_TILE}>
			<div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
				{items.map((item) => (
					<div
						key={item.name}
						className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5"
					>
						{item.image && (
							<img
								src={assetPath(item.image)}
								alt={item.name}
								className="h-7 w-7 shrink-0 object-contain"
							/>
						)}
						<span className="flex-1 truncate text-[0.7rem] font-semibold text-white/85">
							{item.name}
						</span>
						<span className="text-highlight shrink-0 text-[0.65rem] font-bold">
							{item.price}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
