import type { MonsterCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

export function MonsterCard({ monster, killCount, onClick }: MonsterCardProps) {
	const hasKills = killCount > 0;

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${
				hasKills ? "border-green-500/40 bg-green-900/20" : "border-white/10 bg-white/5"
			}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(monster.image)}
					alt={monster.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<div className="flex items-center justify-between gap-2">
						<span
							className={`text-sm leading-tight font-bold ${hasKills ? "text-green-300" : "text-white"}`}
						>
							{monster.name}
						</span>
						<span
							className={`shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-bold ${
								hasKills
									? "bg-highlight/20 text-highlight"
									: "bg-white/10 text-white/40"
							}`}
						>
							&times;{killCount.toLocaleString()}
						</span>
					</div>
					{monster.dangerous && (
						<span className="mt-0.5 inline-block rounded bg-red-500/20 px-1.5 py-0.5 text-[0.55rem] font-bold text-red-400">
							Dangerous
						</span>
					)}
					<div className="mt-1 flex flex-wrap gap-1">
						{monster.locations.map((loc) => (
							<span
								key={loc}
								className="rounded border border-white/10 bg-white/8 px-1.5 py-0.5 text-[0.55rem] text-white/60"
							>
								{loc}
							</span>
						))}
					</div>
					<div className="mt-1 flex gap-3 text-[0.6rem] text-white/50">
						<span>HP: {monster.hp}</span>
						<span>DMG: {monster.damage}</span>
						<span>XP: {monster.xp}</span>
					</div>
				</div>
			</div>
		</button>
	);
}
