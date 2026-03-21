import { SeedRowProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { NAVY_TILE as NAVY_TILE_STYLE } from "@/data/constants/styles";

export function SeedRow({ image, name, prices, variant = "card", emptyLabel }: Props) {
	const isModal = variant === "modal";
	const hasPrices = prices && prices.length > 0;

	return (
		<div
			className={`flex items-center justify-between ${
				isModal
					? "rounded-xl p-3"
					: "rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5"
			}`}
			style={isModal ? NAVY_TILE_STYLE : undefined}
		>
			<div className={`flex items-center ${isModal ? "gap-2" : "gap-1.5"}`}>
				{image ? (
					<img
						src={assetPath(image)}
						alt={name}
						className={`${isModal ? "h-6 w-6" : "h-5 w-5"} object-contain`}
					/>
				) : (
					<div className={isModal ? "h-6 w-6" : "h-5 w-5"} />
				)}
				<span
					className={
						isModal ? "text-sm font-semibold text-white/85" : "text-xs text-white"
					}
				>
					{name}
				</span>
			</div>

			{hasPrices ? (
				<div className={`flex ${isModal ? "gap-4" : "gap-3"}`}>
					{prices.map((bp) => (
						<div key={bp.place} className="flex flex-col items-end">
							<span
								className={`font-semibold tracking-wide text-white/80 uppercase ${
									isModal ? "text-[0.55rem]" : "text-[0.5rem]"
								}`}
							>
								{bp.place}
							</span>
							<span
								className={`text-accent font-bold ${isModal ? "text-sm" : "text-[0.7rem]"}`}
							>
								{bp.price.toLocaleString()}g
							</span>
						</div>
					))}
				</div>
			) : emptyLabel ? (
				<span className="text-[0.65rem] text-white/80">{emptyLabel}</span>
			) : null}
		</div>
	);
}
