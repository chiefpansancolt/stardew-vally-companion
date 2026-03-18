interface Props {
	label: string;
	value: string | number;
	/** Highlight value in gold/amber */
	colored?: boolean;
	/** Highlight value in accent color */
	accent?: boolean;
}

export function StatTile({ label, value, colored, accent }: Props) {
	return (
		<div className="bg-surface rounded-lg border border-[#d6d0bc] px-3 py-2">
			<div className="text-[0.675rem] font-semibold tracking-wide text-gray-500 uppercase">
				{label}
			</div>
			<div
				className={`mt-0.5 text-[0.9375rem] font-bold ${
					colored ? "text-[#a07c10]" : accent ? "text-accent" : "text-gray-800"
				}`}
			>
				{value}
			</div>
		</div>
	);
}
