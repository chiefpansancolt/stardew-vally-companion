import { QualityCalculator } from "stardew-valley-data";
import type { IridiumRowProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { formatNumber } from "@/lib/utils/formatting";
import { NAVY_TILE } from "@/data/constants/styles";

const calc = new QualityCalculator();

export function IridiumRow({ price, label, valueColor, isModal }: IridiumRowProps) {
	const tiers = calc.sellPrices(price);
	return (
		<div className="flex items-center gap-1">
			<span className="w-12 shrink-0 text-right text-[0.5rem] font-semibold tracking-wide text-white/40 uppercase">
				{label}
			</span>
			<div
				className={`grid min-w-0 flex-1 grid-cols-4 overflow-hidden border border-white/10 ${isModal ? "rounded-xl" : "rounded-lg"}`}
			>
				<div
					className={`flex flex-col items-center gap-0.5 border-r border-white/10 px-1 last:border-r-0 ${isModal ? "py-2" : "bg-white/5 py-1.5"}`}
					style={isModal ? NAVY_TILE : undefined}
				>
					<span className="text-[0.55rem] font-semibold tracking-wide text-white uppercase">
						Basic
					</span>
					<span className={`text-xs font-bold ${valueColor}`}>
						{formatNumber(price)}g
					</span>
				</div>
				{tiers.map(({ quality, icon, value }) => (
					<div
						key={quality}
						className={`flex flex-col items-center gap-0.5 border-r border-white/10 px-1 last:border-r-0 ${isModal ? "py-2" : "bg-white/5 py-1.5"}`}
						style={isModal ? NAVY_TILE : undefined}
					>
						<img
							src={assetPath(icon)}
							alt={quality}
							className="h-3.5 w-3.5 object-contain"
						/>
						<span className={`text-xs font-bold ${valueColor}`}>
							{formatNumber(value)}g
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
