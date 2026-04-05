import { NavySectionProps } from "@/types";

export function NavySection({ title, badge, children }: NavySectionProps) {
	return (
		<div
			className="border-secondary/60 rounded-xl border p-5"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			<div className="mb-4 flex items-center justify-between">
				<h3
					className="text-[0.8125rem] font-bold tracking-wide text-white uppercase"
					style={{ fontFamily: "var(--font-stardew-valley)" }}
				>
					{title}
				</h3>
				{badge && (
					<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
						{badge}
					</span>
				)}
			</div>
			{children}
		</div>
	);
}
