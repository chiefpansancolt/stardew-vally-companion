import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { HeartEvent, VillagerCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { effectiveMaxHearts } from "@/lib/utils/villagerHearts";

export function VillagerCard({ villager, gameData, onClick }: VillagerCardProps) {
	const progress = gameData.villagers[villager.name];
	const hearts = progress?.hearts ?? 0;
	const eventsSeen = progress?.eventsSeen ?? [];
	const status = (progress?.status ?? "").toLowerCase();

	const isMarried = gameData.character.spouse === villager.name;
	const maxHearts = effectiveMaxHearts(villager, isMarried, status);
	const isMaxHearts = progress !== undefined && hearts >= maxHearts;

	const heartEvents = (villager.events as HeartEvent[]).filter((e) => e.id !== null);
	const totalEvents = heartEvents.length;
	const seenEvents = heartEvents.filter((e) =>
		[e.id!].flat().some((id) => eventsSeen.includes(String(id)))
	).length;
	const eventPct = totalEvents > 0 ? Math.round((seenEvents / totalEvents) * 100) : 0;
	const eventsComplete = totalEvents > 0 && seenEvents === totalEvents;

	let cardStyle = "border-slate-500 bg-slate-700/50";
	if (isMaxHearts) cardStyle = "border-green-500 bg-green-900/40";

	let nameColor = "text-white";
	if (isMaxHearts) nameColor = "text-green-300";

	const rawStatus = progress?.status ?? "";
	const statusLabel = isMarried ? "Married" : rawStatus || "—";
	let statusCls = "bg-slate-600 text-slate-200";
	if (isMaxHearts) statusCls = "bg-green-800 text-green-300";
	const statusBadge = { label: statusLabel, cls: statusCls };

	let barFill = "#94a3b8";
	if (isMaxHearts) barFill = "#4ade80";
	if (eventsComplete) barFill = "#4a7c31";

	return (
		<button
			onClick={onClick}
			className={`hover:border-accent/50 hover:bg-accent/8 flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${cardStyle}`}
		>
			<img
				src={assetPath(villager.image)}
				alt={villager.name}
				className="h-16 w-16 rounded-lg object-contain"
				style={{
					background: isMaxHearts ? "#14532d" : "#334155",
					border: isMaxHearts ? "2px solid #4ade80" : "2px solid #64748b",
				}}
			/>

			<div className={`text-sm leading-tight font-bold ${nameColor}`}>{villager.name}</div>

			<div className="flex flex-wrap justify-center gap-px">
				{Array.from({ length: maxHearts }).map((_, i) =>
					i < hearts ? (
						<FaHeart key={i} className="h-2.5 w-2.5 text-red-400" />
					) : (
						<FaRegHeart key={i} className="h-2.5 w-2.5 text-slate-500" />
					)
				)}
			</div>

			<div
				className={`text-[0.7rem] font-semibold ${
					isMaxHearts ? "text-green-300" : "text-slate-200"
				}`}
			>
				{hearts} / {maxHearts}
			</div>

			{progress !== undefined &&
				(() => {
					const heartPoints = progress.heartPoints ?? 0;
					const maxPoints = maxHearts * 250;
					const partial = heartPoints % 250;
					const pct = Math.round((partial / 250) * 100);
					return (
						<div className="w-full">
							<div
								className={`text-center text-[0.625rem] font-semibold ${isMaxHearts ? "text-green-300" : "text-slate-300"}`}
							>
								{heartPoints} / {maxPoints} pts
							</div>
							{!isMaxHearts && (
								<>
									<div className="mt-0.5 h-0.75 w-full overflow-hidden rounded-full bg-slate-600">
										<div
											className="h-full rounded-full"
											style={{ width: `${pct}%`, background: "#f87171" }}
										/>
									</div>
									<div className="mt-0.5 text-center text-[0.6rem] text-slate-100">
										{250 - partial} pts to next{" "}
										<FaHeart className="inline h-2 w-2 text-red-400" />
									</div>
								</>
							)}
						</div>
					);
				})()}

			<div className="w-full">
				<div className="mb-1 flex justify-between">
					<span
						className={`text-[0.65rem] font-semibold tracking-wide uppercase ${
							isMaxHearts ? "text-green-300" : "text-slate-300"
						}`}
					>
						Events
					</span>
					<span
						className={`text-[0.65rem] font-bold ${
							isMaxHearts ? "text-green-300" : "text-slate-200"
						}`}
					>
						{totalEvents > 0 ? `${seenEvents} / ${totalEvents}` : "—"}
					</span>
				</div>
				<div className="h-0.75 w-full overflow-hidden rounded-full bg-slate-600">
					<div
						className="h-full rounded-full"
						style={{ width: `${eventPct}%`, background: barFill }}
					/>
				</div>
			</div>

			<span
				className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${statusBadge.cls}`}
			>
				{statusBadge.label}
			</span>
		</button>
	);
}
