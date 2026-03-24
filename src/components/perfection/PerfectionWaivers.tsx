"use client";

import { FaBuilding } from "react-icons/fa";
import { NavySection } from "@/comps/ui/NavySection";

interface Props {
	waivers: number;
}

export function PerfectionWaivers({ waivers }: Props) {
	const scoreBoost = waivers;

	return (
		<NavySection title="Perfection Waivers" badge={`${waivers} used`}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
					<div className="flex flex-col gap-1.5">
						<span className="text-[0.65rem] font-semibold tracking-wide text-white/50 uppercase">
							Score Boost from Waivers
						</span>
						<span className="text-highlight text-2xl font-bold">+{scoreBoost}%</span>
					</div>
					<div className="flex flex-col gap-1.5">
						<span className="text-[0.65rem] font-semibold tracking-wide text-white/50 uppercase">
							Cost per Waiver
						</span>
						<div className="flex items-center gap-1.5">
							<img
								src="/images/misc/Gold.png"
								alt="Gold"
								className="h-4 w-4 shrink-0 object-contain"
							/>
							<span className="text-[0.85rem] font-semibold text-white/80">
								500,000g
							</span>
						</div>
					</div>
					<div className="flex flex-col gap-1.5">
						<span className="text-[0.65rem] font-semibold tracking-wide text-white/50 uppercase">
							Effect
						</span>
						<span className="text-[0.8rem] text-white/80">
							Each waiver increases your perfection score by 1%
						</span>
					</div>
				</div>

				<div className="rounded-lg border border-white/10 bg-white/5 p-3">
					<div className="mb-2 flex items-center gap-2">
						<FaBuilding className="h-3.5 w-3.5 shrink-0 text-white/40" />
						<span className="text-[0.7rem] font-bold text-white/80">How to obtain</span>
					</div>
					<p className="text-[0.7rem] leading-relaxed text-white/80">
						After interacting with the Perfection Tracker statue in Qi&apos;s Walnut
						Room, Fizz (Joja Special Services Division) will send you a letter. Meet him
						in the mushroom cave on Ginger Island — the same cave where Professor Snail
						was initially found.
					</p>
				</div>
			</div>
		</NavySection>
	);
}
