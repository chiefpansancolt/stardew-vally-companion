import type { ArtisanUsesRowProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { ARTISAN_USE_META } from "@/data/constants/artisanGoods";

export function ArtisanUsesRow({ artisanUses }: ArtisanUsesRowProps) {
	const active = Object.entries(artisanUses).filter(([, v]) => v);
	if (active.length === 0) return null;
	return (
		<div className="flex flex-wrap gap-1.5">
			{active.map(([key]) => {
				const meta = ARTISAN_USE_META[key];
				if (!meta) return null;
				return (
					<div
						key={key}
						className="flex items-center gap-1 rounded-lg border border-white/12 bg-white/7 px-2 py-1"
					>
						<img
							src={assetPath(meta.image)}
							alt={meta.name}
							className="h-3.5 w-3.5 object-contain"
						/>
						<span className="text-[0.65rem] font-semibold text-white/70">
							{meta.name}
						</span>
					</div>
				);
			})}
		</div>
	);
}
