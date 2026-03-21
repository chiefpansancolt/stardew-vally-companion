import { SearchFieldProps as Props } from "@/types";

export function SearchField({ value, onChange, placeholder = "Search…", variant = "dark" }: Props) {
	const cls =
		variant === "light"
			? "focus:border-primary w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
			: "flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white placeholder:text-white/80 focus:border-white/40 focus:outline-none";

	return (
		<input
			type="search"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className={cls}
		/>
	);
}
