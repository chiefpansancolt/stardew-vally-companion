import { QualityCalculator } from "stardew-valley-data";
import { assetPath } from "@/lib/utils/assetPath";

interface Props {
	energy: number;
	health: number;
	maxQuality: string;
	variant?: "card" | "modal";
	poison?: boolean;
}

const calc = new QualityCalculator();

const NAVY_TILE_STYLE = {
	background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)",
	border: "1px solid rgba(43,58,103,0.6)",
} as const;

function EHPair({
	energy,
	health,
	iconSize,
	textSize,
}: {
	energy: number;
	health: number;
	iconSize: string;
	textSize: string;
}) {
	return (
		<div className="flex items-center gap-1.5">
			<span className="inline-flex items-center gap-0.5">
				<img
					src={assetPath("images/misc/Energy.png")}
					alt="Energy"
					className={`${iconSize} object-contain`}
				/>
				<span className={`${textSize} font-bold text-yellow-300`}>+{energy}</span>
			</span>
			<span className="inline-flex items-center gap-0.5">
				<img
					src={assetPath("images/misc/Health.png")}
					alt="Health"
					className={`${iconSize} object-contain`}
				/>
				<span className={`${textSize} font-bold text-red-400`}>+{health}</span>
			</span>
		</div>
	);
}

export function EnergyHealthGrid({
	energy,
	health,
	maxQuality,
	variant = "card",
	poison = false,
}: Props) {
	const isModal = variant === "modal";

	if (poison) {
		return (
			<div
				className={`flex items-center gap-1.5 border border-white/10 ${isModal ? "rounded-xl px-3 py-2" : "rounded-lg bg-white/5 px-3 py-1.5"}`}
				style={isModal ? NAVY_TILE_STYLE : undefined}
			>
				<img
					src={assetPath("images/misc/Poison.png")}
					alt="Poison"
					className="h-4 w-4 object-contain"
				/>
				<span className="text-xs font-semibold text-red-400">Poison</span>
			</div>
		);
	}

	if (maxQuality === "iridium") {
		const tiers = calc.energyHealth(energy, health);
		const iconSize = isModal ? "h-4 w-4" : "h-3.5 w-3.5";
		const textSize = isModal ? "text-xs" : "text-[0.65rem]";

		return (
			<div
				className={`grid grid-cols-4 overflow-hidden border border-white/10 ${isModal ? "rounded-xl" : "rounded-lg"}`}
			>
				<div
					className={`flex flex-col items-center gap-1 border-r border-white/10 px-1 ${isModal ? "py-2.5" : "bg-white/5 py-1.5"}`}
					style={isModal ? NAVY_TILE_STYLE : undefined}
				>
					<span className="text-[0.55rem] font-semibold tracking-wide text-white/80 uppercase">
						Basic
					</span>
					<EHPair energy={energy} health={health} iconSize={iconSize} textSize={textSize} />
				</div>
				{tiers.map(({ quality, icon, energy: e, health: h }) => (
					<div
						key={quality}
						className={`flex flex-col items-center gap-1 border-r border-white/10 px-1 last:border-r-0 ${isModal ? "py-2.5" : "bg-white/5 py-1.5"}`}
						style={isModal ? NAVY_TILE_STYLE : undefined}
					>
						<img
							src={assetPath(icon)}
							alt={quality}
							className={`${iconSize} object-contain`}
						/>
						<EHPair energy={e} health={h} iconSize={iconSize} textSize={textSize} />
					</div>
				))}
			</div>
		);
	}

	return (
		<div
			className={`flex items-center gap-3 border border-white/10 ${isModal ? "rounded-xl px-3 py-2" : "rounded-lg bg-white/5 px-2.5 py-1.5"}`}
			style={isModal ? NAVY_TILE_STYLE : undefined}
		>
			<span className="inline-flex items-center gap-1">
				<img
					src={assetPath("images/misc/Energy.png")}
					alt="Energy"
					className={`${isModal ? "h-4 w-4" : "h-3.5 w-3.5"} object-contain`}
				/>
				<span className={`${isModal ? "text-sm" : "text-xs"} font-semibold text-yellow-300`}>
					+{energy}
				</span>
			</span>
			<span className="inline-flex items-center gap-1">
				<img
					src={assetPath("images/misc/Health.png")}
					alt="Health"
					className={`${isModal ? "h-4 w-4" : "h-3.5 w-3.5"} object-contain`}
				/>
				<span className={`${isModal ? "text-sm" : "text-xs"} font-semibold text-red-400`}>
					+{health}
				</span>
			</span>
		</div>
	);
}
