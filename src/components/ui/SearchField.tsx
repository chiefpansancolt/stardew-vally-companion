interface Props {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export function SearchField({ value, onChange, placeholder = "Search…" }: Props) {
	return (
		<input
			type="search"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white placeholder:text-white/80 focus:border-white/40 focus:outline-none"
		/>
	);
}
