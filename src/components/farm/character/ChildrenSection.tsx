"use client";

import { FaBaby } from "react-icons/fa";
import { type CharacterProps as Props } from "@/types";
import { NavySection } from "@/comps/ui/NavySection";

export function ChildrenSection({ gameData }: Props) {
	const { children } = gameData;

	if (children.length === 0) return null;

	return (
		<NavySection title="Children" badge={`${children.length} / 2`}>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{children.map((child, idx) => (
					<div
						key={idx}
						className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
					>
						<div className="bg-accent/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
							<FaBaby className="text-accent h-5 w-5" />
						</div>
						<div className="min-w-0 flex-1">
							<div className="text-sm font-bold text-white">
								{child.name || "Unnamed"}
							</div>
							<div className="mt-0.5 flex items-center gap-2">
								<span className="text-xs text-white/60">Age {child.age}</span>
								{child.gender && (
									<>
										<span className="text-white/30">·</span>
										<span className="text-xs text-white/60">
											{child.gender}
										</span>
									</>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</NavySection>
	);
}
