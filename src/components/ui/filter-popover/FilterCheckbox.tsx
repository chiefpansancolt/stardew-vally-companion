import type { FilterCheckboxProps } from "@/types";

export function FilterCheckbox({ value, checked, onChange, children }: FilterCheckboxProps) {
	return (
		<label
			className={`relative flex cursor-pointer items-center rounded-md border px-2.5 py-1 transition-all ${
				checked
					? "border-accent bg-accent text-white"
					: "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
			}`}
		>
			<input
				type="checkbox"
				value={value}
				checked={checked}
				onChange={onChange}
				className="absolute inset-0 cursor-pointer appearance-none"
			/>
			<span className="text-[0.7rem] font-semibold">{children}</span>
		</label>
	);
}
