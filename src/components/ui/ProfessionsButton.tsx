import { ProfessionsButtonProps as Props } from "@/types";

export function ProfessionsButton({ active, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all ${
				active
					? "border-accent/50 bg-accent/20 text-accent"
					: "border-white/20 bg-white/10 text-white/60 hover:text-white/80"
			}`}
		>
			Profession Prices
		</button>
	);
}
