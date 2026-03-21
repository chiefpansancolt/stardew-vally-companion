export function DifficultyBar({ value }: { value: number }) {
	const level = value <= 33 ? "easy" : value <= 66 ? "medium" : "hard";
	const color = level === "easy" ? "#4a7c31" : level === "medium" ? "#c0963a" : "#ef4444";
	const textColor =
		level === "easy"
			? "text-green-400"
			: level === "medium"
				? "text-yellow-400"
				: "text-red-400";
	return (
		<div className="flex items-center gap-2">
			<span className="w-11 shrink-0 text-right text-[0.55rem] font-semibold tracking-wide text-white/40 uppercase">
				Diff.
			</span>
			<div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
				<div
					className="h-full rounded-full"
					style={{ width: `${value}%`, background: color }}
				/>
			</div>
			<span className={`w-6 shrink-0 text-right text-[0.65rem] font-bold ${textColor}`}>
				{value}
			</span>
		</div>
	);
}
