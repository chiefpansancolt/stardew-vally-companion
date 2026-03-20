import { QualityCalculator } from "stardew-valley-data";
import { assetPath } from "@/lib/utils/assetPath";

interface Props {
	price: number;
	maxQuality: string;
	shipped?: boolean;
	variant?: "card" | "modal";
}

const calc = new QualityCalculator();

const NAVY_TILE_STYLE = {
	background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
	border: "1px solid rgba(43,58,103,0.6)",
} as const;

export function PriceGrid({ price, maxQuality, shipped = false, variant = "card" }: Props) {
	const isModal = variant === "modal";
	const valueColor = isModal ? "text-white/85" : shipped ? "text-green-300" : "text-white/80";

	if (maxQuality === "iridium") {
		const tiers = calc.sellPrices(price);
		return (
			<div
				className={`grid grid-cols-4 overflow-hidden border border-white/10 ${isModal ? "rounded-xl" : "rounded-lg"}`}
			>
				<div
					className={`flex flex-col items-center gap-0.5 border-r border-white/10 px-1 last:border-r-0 ${isModal ? "py-2" : "bg-white/5 py-1.5"}`}
					style={isModal ? NAVY_TILE_STYLE : undefined}
				>
					<span className="text-[0.55rem] font-semibold tracking-wide text-white uppercase">
						Basic
					</span>
					<span className={`text-xs font-bold ${valueColor}`}>{price}g</span>
				</div>
				{tiers.map(({ quality, icon, value }) => (
					<div
						key={quality}
						className={`flex flex-col items-center gap-0.5 border-r border-white/10 px-1 last:border-r-0 ${isModal ? "py-2" : "bg-white/5 py-1.5"}`}
						style={isModal ? NAVY_TILE_STYLE : undefined}
					>
						<img src={assetPath(icon)} alt={quality} className="h-3.5 w-3.5 object-contain" />
						<span className={`text-xs font-bold ${valueColor}`}>{value}g</span>
					</div>
				))}
			</div>
		);
	}

	return (
		<div
			className={`flex items-center justify-between border border-white/10 ${isModal ? "rounded-xl px-3 py-2" : "rounded-lg bg-white/5 px-2.5 py-1.5"}`}
			style={isModal ? NAVY_TILE_STYLE : undefined}
		>
			<span className="text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase">
				Price
			</span>
			<span className={`${isModal ? "text-sm" : "text-xs"} font-bold ${valueColor}`}>{price}g</span>
		</div>
	);
}
