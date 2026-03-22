import { tools } from "stardew-valley-data";
import type { ToolCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { LEVEL_META, LEVEL_NAMES, PAN_LEVEL_OFFSET } from "@/data/constants/tools";

export function ToolCard({ toolId, level, onClick }: ToolCardProps) {
	const tool = tools().find(toolId);
	if (!tool || tool.type !== "upgradeable") return null;

	const isPan = toolId === "pan";
	const levelIndex = isPan ? Math.max(0, level - PAN_LEVEL_OFFSET) : level;
	const levelData = tool.levels[levelIndex];
	const levelName = LEVEL_NAMES[level] ?? LEVEL_NAMES[LEVEL_NAMES.length - 1];
	const imgSrc = levelData?.image ? assetPath(levelData.image) : null;
	const totalDots = tool.levels.length;
	const dotNames = isPan ? ["Copper", "Steel", "Gold", "Iridium"] : LEVEL_NAMES;

	return (
		<button
			onClick={onClick}
			className="hover:border-accent/40 hover:bg-accent/10 flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-all"
		>
			{imgSrc ? (
				<img src={imgSrc} alt={tool.name} className="h-10 w-10 object-contain" />
			) : (
				<div className="h-10 w-10 rounded-lg bg-white/10" />
			)}
			<div className="text-xs font-bold text-white">{tool.name}</div>
			<span
				className={`text-[0.625rem] font-bold ${LEVEL_META[levelName]?.textClass ?? "text-white/40"}`}
			>
				{levelName}
			</span>
			<div className="flex gap-1.5">
				{Array.from({ length: totalDots }).map((_, i) => {
					const dotLevelName = dotNames[i] ?? "";
					const filled = i <= levelIndex;
					return (
						<div
							key={i}
							className="h-2.5 w-2.5 rounded-full transition-all"
							style={{
								backgroundColor: filled
									? (LEVEL_META[dotLevelName]?.dotColor ??
										"rgba(255,255,255,0.25)")
									: "rgba(255,255,255,0.1)",
							}}
						/>
					);
				})}
			</div>
		</button>
	);
}
