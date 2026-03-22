import type { SpecialItemCardProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { SPECIAL_ITEM_TYPE_LABELS } from "@/data/constants/specialItems";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function SpecialItemCard({ item, acquired, onClick }: Props) {
	const isInfo = acquired === null;
	const borderBg = isInfo
		? "border-white/10 bg-white/5"
		: acquired
			? "border-green-400/30 bg-green-400/10"
			: "border-white/10 bg-white/5";

	return (
		<button
			type="button"
			onClick={onClick}
			className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-white/10 ${borderBg}`}
		>
			<img
				src={assetPath(item.image)}
				alt={item.name}
				className={`h-12 w-12 shrink-0 object-contain ${!isInfo && !acquired ? "opacity-40 grayscale" : ""}`}
			/>
			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-2">
					<span
						className={`text-sm font-semibold ${
							isInfo ? "text-white/70" : acquired ? "text-green-300" : "text-white/40"
						}`}
					>
						{item.name}
					</span>
					{!isInfo && (
						<StatusBadge
							status={acquired ? "success" : "inactive"}
							label={acquired ? "Acquired" : "Not Acquired"}
						/>
					)}
				</div>
				<p className="mt-0.5 line-clamp-1 text-xs text-white/80">{item.effect}</p>
				<span className="mt-1 inline-block rounded bg-white/5 px-1.5 py-0.5 text-[0.625rem] text-white/80">
					{SPECIAL_ITEM_TYPE_LABELS[item.type] ?? item.type}
				</span>
			</div>
		</button>
	);
}
