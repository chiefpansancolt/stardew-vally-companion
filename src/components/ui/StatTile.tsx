interface Props {
	label: string;
	value: string | number;
	colored?: boolean;
	accent?: boolean;
	valueColor?: string;
	suffix?: string | number;
}

export function StatTile({ label, value, colored, accent, valueColor, suffix }: Props) {
	const color = valueColor
		? valueColor
		: colored
			? "text-[#a07c10]"
			: accent
				? "text-accent"
				: "text-gray-800";

	return (
		<div className="bg-surface rounded-lg border border-[#d6d0bc] px-3 py-2">
			<div className="text-[0.675rem] font-semibold tracking-wide text-gray-500 uppercase">
				{label}
			</div>
			<div className="mt-0.5 flex items-baseline gap-1">
				<span className={`text-[0.9375rem] font-bold ${color}`}>{value}</span>
				{suffix !== undefined && (
					<span className="text-[0.9375rem] font-semibold text-gray-700">{suffix}</span>
				)}
			</div>
		</div>
	);
}
