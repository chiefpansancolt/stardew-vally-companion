import { search } from "stardew-valley-data";
import type { BundleCardProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { formatNumber } from "@/lib/utils/formatting";
import { StatusBadge } from "@/comps/ui/StatusBadge";

const IMAGE_FALLBACK: Record<string, string> = {
	"Spring Seeds": "images/craftable/seeds/Spring Seeds.png",
	"Summer Seeds": "images/craftable/seeds/Summer Seeds.png",
	"Fall Seeds": "images/craftable/seeds/Fall Seeds.png",
	"Winter Seeds": "images/craftable/seeds/Winter Seeds.png",
	"Large Egg (Brown)": "images/animals/produce/Large Brown Egg.png",
};

function getItemImage(name: string): string | null {
	if (IMAGE_FALLBACK[name]) return IMAGE_FALLBACK[name];
	const match = search(name).find((r) => r.name === name);
	return match?.image ?? null;
}

export function BundleCard({ bundle, completedItems }: Props) {
	const isGold = bundle.type === "gold";

	const completedCount = Object.values(completedItems).filter(Boolean).length;
	const totalRequired = isGold ? 1 : bundle.itemsRequired;
	const isComplete = isGold
		? !!completedItems["0"]
		: completedCount >= totalRequired;

	const rewardImage = getItemImage(bundle.reward.name);

	return (
		<div
			className={`flex flex-col gap-2 rounded-lg border p-3 ${
				isComplete
					? "border-green-400/30 bg-green-400/10"
					: "border-white/10 bg-white/5"
			}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(bundle.image)}
					alt={bundle.name}
					className="h-10 w-10 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-2">
						<span
							className={`text-[0.8rem] font-semibold ${isComplete ? "text-green-300" : "text-white/80"}`}
						>
							{bundle.name}
						</span>
						<StatusBadge
							status={isComplete ? "success" : "inactive"}
							label={isComplete ? "Complete" : "Incomplete"}
						/>
					</div>
					{!isGold && (
						<div className="mt-0.5 text-[0.6rem] text-white/80">
							{completedCount} / {totalRequired} items
						</div>
					)}
				</div>
			</div>

			{isGold ? (
				<div
					className={`py-2 text-center text-lg font-extrabold ${isComplete ? "text-highlight" : "text-highlight/40"}`}
				>
					{formatNumber(bundle.goldCost)}g
				</div>
			) : (
				<div className="flex flex-wrap gap-1.5">
					{bundle.items.map((item, idx) => {
						const done = !!completedItems[String(idx)];
						const image = getItemImage(item.name);
						return (
							<div
								key={`${item.name}-${idx}`}
								className={`relative flex w-18 flex-col items-center gap-1 rounded-lg border p-1.5 ${
									done
										? "border-green-400/25 bg-green-400/12"
										: "border-white/10 bg-white/5"
								}`}
							>
								{done && (
									<div className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-[7px] font-black text-white">
										&#x2713;
									</div>
								)}
								{image ? (
									<img
										src={assetPath(image)}
										alt={item.name}
										className="h-9 w-9 object-contain"
									/>
								) : (
									<div className="flex h-9 w-9 items-center justify-center text-[0.5rem] text-white/80">
										?
									</div>
								)}
								<span className="text-center text-[0.55rem] leading-tight text-white/80">
									{item.name}
								</span>
								{(item.quantity > 1 || item.quality) && (
									<span className="flex items-center gap-0.5 text-[0.5rem] text-white/80">
										{item.quantity > 1 ? `${item.quantity}x` : ""}
										{item.quality && (
											<img
												src={`/images/misc/${item.quality.charAt(0).toUpperCase() + item.quality.slice(1)} Quality.png`}
												alt={item.quality}
												className="h-3 w-3 object-contain"
											/>
										)}
									</span>
								)}
							</div>
						);
					})}
				</div>
			)}

			<div className="flex items-center gap-1.5 rounded-lg border border-highlight/15 bg-highlight/8 px-2 py-1">
				<span className="text-[0.55rem] font-semibold text-white/80">Reward:</span>
				{rewardImage && (
					<img
						src={assetPath(rewardImage)}
						alt={bundle.reward.name}
						className="h-5 w-5 object-contain"
					/>
				)}
				<span className="text-[0.6rem] font-bold text-highlight">
					{bundle.reward.quantity > 1 ? `${bundle.reward.quantity} ` : ""}
					{bundle.reward.name}
				</span>
			</div>
		</div>
	);
}
