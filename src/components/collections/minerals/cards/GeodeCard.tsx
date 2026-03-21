import { HiChevronRight } from "react-icons/hi";
import type { GeodeCardProps as CardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/price-grid";

export function GeodeCard({ geode, contents, onClick }: CardProps) {
	return (
		<button
			onClick={onClick}
			className="flex w-full cursor-pointer flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-all"
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(geode.image)}
					alt={geode.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className="text-sm leading-tight font-bold text-white">{geode.name}</span>
					{(geode.contents?.length ?? contents.length) > 0 && (
						<div className="text-accent mt-0.5 text-[0.6rem] font-semibold">
							{geode.contents?.length ?? contents.length} possible contents{" "}
							<HiChevronRight className="inline h-3 w-3" />
						</div>
					)}
				</div>
			</div>
			<PriceGrid price={geode.sellPrice} maxQuality="normal" />
		</button>
	);
}
