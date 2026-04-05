"use client";

import type { RarecrowCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function RarecrowCard({ rarecrow, obtained }: RarecrowCardProps) {
	const borderBg = obtained
		? "border-green-400/30 bg-green-400/10"
		: "border-white/10 bg-white/5";

	return (
		<div className={`flex items-start gap-3 rounded-lg border p-3 ${borderBg}`}>
			<img
				src={assetPath(rarecrow.image)}
				alt={rarecrow.name}
				className="h-12 w-12 shrink-0 object-contain"
			/>
			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between gap-2">
					<span
						className={`text-sm font-semibold ${obtained ? "text-green-300" : "text-white/80"}`}
					>
						{rarecrow.name}
					</span>
					<StatusBadge
						status={obtained ? "success" : "inactive"}
						label={obtained ? "Obtained" : "Missing"}
					/>
				</div>
				<p className="mt-0.5 line-clamp-2 text-xs text-white/80">{rarecrow.obtain}</p>
			</div>
		</div>
	);
}
