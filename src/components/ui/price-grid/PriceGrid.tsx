import { QualityCalculator } from "stardew-valley-data";
import { PriceGridProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { formatNumber } from "@/lib/utils/formatting";
import { NAVY_TILE } from "@/data/constants/styles";
import { IridiumRow } from "./IridiumRow";

const calc = new QualityCalculator();

export function PriceGrid({
	price,
	maxQuality,
	shipped = false,
	variant = "card",
	professionBonus = null,
	professionBonuses,
}: Props) {
	const isModal = variant === "modal";
	const valueColor = isModal ? "text-white/85" : shipped ? "text-green-300" : "text-white/80";
	const bonusColor = "text-accent";

	if (maxQuality === "iridium") {
		if (professionBonus !== null) {
			return (
				<div className="flex flex-col gap-1">
					<IridiumRow
						price={price}
						label="Base"
						valueColor={valueColor}
						isModal={isModal}
					/>
					<IridiumRow
						price={professionBonus.price}
						label={professionBonus.label}
						valueColor={bonusColor}
						isModal={isModal}
					/>
				</div>
			);
		}

		const tiers = calc.sellPrices(price);
		return (
			<div
				className={`grid grid-cols-4 overflow-hidden border border-white/10 ${isModal ? "rounded-xl" : "rounded-lg"}`}
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
		);
	}

	if (professionBonuses && professionBonuses.length > 0) {
		const rowCls = `flex flex-1 items-center justify-between border border-white/10 ${isModal ? "rounded-xl px-3 py-2" : "rounded-lg bg-white/5 px-2.5 py-1.5"}`;
		const labelCls =
			"w-12 shrink-0 text-right text-[0.5rem] font-semibold tracking-wide text-white/40 uppercase";
		const priceLabelCls = "text-[0.6rem] font-semibold tracking-wide text-white/50 uppercase";
		const priceValCls = `${isModal ? "text-sm" : "text-xs"} font-bold`;
		return (
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-1">
					<span className={labelCls}>Base</span>
					<div className={rowCls} style={isModal ? NAVY_TILE : undefined}>
						<span className={priceLabelCls}>Price</span>
						<span className={`${priceValCls} ${valueColor}`}>
							{formatNumber(price)}g
						</span>
					</div>
				</div>
				{professionBonuses.map((b) => (
					<div key={b.label} className="flex items-center gap-1">
						<span className={labelCls}>{b.label}</span>
						<div className={rowCls} style={isModal ? NAVY_TILE : undefined}>
							<span className={priceLabelCls}>Price</span>
							<span className={`${priceValCls} ${bonusColor}`}>
								{formatNumber(b.price)}g
							</span>
						</div>
					</div>
				))}
			</div>
		);
	}

	if (professionBonus !== null) {
		return (
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-1">
					<span className="w-12 shrink-0 text-right text-[0.5rem] font-semibold tracking-wide text-white/40 uppercase">
						Base
					</span>
					<div
						className={`flex flex-1 items-center justify-between border border-white/10 ${isModal ? "rounded-xl px-3 py-2" : "rounded-lg bg-white/5 px-2.5 py-1.5"}`}
						style={isModal ? NAVY_TILE : undefined}
					>
						<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
							Price
						</span>
						<span
							className={`${isModal ? "text-sm" : "text-xs"} font-bold ${valueColor}`}
						>
							{formatNumber(price)}g
						</span>
					</div>
				</div>
				<div className="flex items-center gap-1">
					<span className="w-12 shrink-0 text-right text-[0.5rem] font-semibold tracking-wide text-white/40 uppercase">
						{professionBonus.label}
					</span>
					<div
						className={`flex flex-1 items-center justify-between border border-white/10 ${isModal ? "rounded-xl px-3 py-2" : "rounded-lg bg-white/5 px-2.5 py-1.5"}`}
						style={isModal ? NAVY_TILE : undefined}
					>
						<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
							Price
						</span>
						<span
							className={`${isModal ? "text-sm" : "text-xs"} font-bold ${bonusColor}`}
						>
							{formatNumber(professionBonus.price)}g
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`flex items-center justify-between border border-white/10 ${isModal ? "rounded-xl px-3 py-2" : "rounded-lg bg-white/5 px-2.5 py-1.5"}`}
			style={isModal ? NAVY_TILE : undefined}
		>
			<span className="text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
				Price
			</span>
			<span className={`${isModal ? "text-sm" : "text-xs"} font-bold ${valueColor}`}>
				{formatNumber(price)}g
			</span>
		</div>
	);
}
