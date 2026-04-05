"use client";

import { FaBaby } from "react-icons/fa";
import { type CharacterProps as Props } from "@/types";

export function ChildrenSection({ gameData }: Props) {
	const { children } = gameData;

	if (children.length === 0) return null;

	return (
		<div
			className="border-secondary/60 rounded-xl border p-5"
			style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
		>
			<div className="mb-4 flex items-center justify-between">
				<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
					Children
				</h3>
				<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
					{children.length} / 2
				</span>
			</div>

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
								<span className="text-xs text-white/60">Age ${child.age}</span>
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
		</div>
	);
}
