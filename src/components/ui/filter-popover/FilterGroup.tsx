import type { FilterGroupProps } from "@/types";

export function FilterGroup({ label, className = "", children }: FilterGroupProps) {
	return (
		<div className={className}>
			<div className="mb-2 text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
				{label}
			</div>
			<div className="flex flex-wrap gap-1.5">{children}</div>
		</div>
	);
}
