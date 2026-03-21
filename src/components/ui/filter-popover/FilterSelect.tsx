import type { FilterSelectProps } from "@/types";

export function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
	return (
		<div>
			<div className="mb-2 text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
				{label}
			</div>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="focus:border-accent w-full cursor-pointer rounded-md border border-white/20 bg-white/5 px-2.5 py-1.5 text-[0.7rem] font-semibold text-white/80 outline-none"
			>
				{options.map((opt) => (
					<option
						key={opt.value}
						value={opt.value}
						className="bg-surface-dark text-white"
					>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}
