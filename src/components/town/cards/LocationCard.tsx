import type { LocationCardProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

export function LocationCard({ location, hasShop, onClick }: Props) {
	const Tag = hasShop ? "button" : "div";

	return (
		<Tag
			type={hasShop ? "button" : undefined}
			onClick={hasShop ? onClick : undefined}
			className={`flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-left transition-colors ${
				hasShop ? "cursor-pointer hover:bg-white/10" : ""
			}`}
		>
			<img
				src={assetPath(location.image)}
				alt={location.name}
				className="h-14 w-14 shrink-0 rounded-lg object-cover"
			/>
			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-2">
					<span className="text-sm font-semibold text-white">{location.name}</span>
					{hasShop ? (
						<span className="rounded-full border border-green-400/30 bg-green-400/20 px-2 py-0.5 text-[0.55rem] font-bold text-green-300">
							Shop
						</span>
					) : (
						<span className="rounded-full border border-white/10 bg-white/6 px-2 py-0.5 text-[0.5rem] font-semibold text-white/40">
							Location
						</span>
					)}
				</div>
				<div className="mt-1 text-[0.65rem] text-white/50">
					{location.openHours ? (
						<span>
							<span className="text-highlight font-semibold">
								{location.openHours.open} - {location.openHours.close}
							</span>
						</span>
					) : (
						<span className="text-highlight font-semibold">Always open</span>
					)}
				</div>
				{location.closed.length > 0 && (
					<div className="mt-1 flex flex-wrap gap-1">
						{location.closed.map((day) => (
							<span
								key={day}
								className="rounded-full border border-red-400/20 bg-red-400/15 px-1.5 py-0 text-[0.5rem] font-semibold text-red-300"
							>
								Closed {day}
							</span>
						))}
					</div>
				)}
				{location.occupants.length > 0 && (
					<div className="mt-1 text-[0.6rem] text-white/40">
						{location.occupants.join(", ")}
					</div>
				)}
			</div>
		</Tag>
	);
}
