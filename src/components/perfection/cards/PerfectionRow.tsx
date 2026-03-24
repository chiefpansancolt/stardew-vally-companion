"use client";

import { useState } from "react";
import { HiCheck, HiChevronDown, HiChevronUp } from "react-icons/hi";
import type { CategoryProgress } from "@/lib/pages/perfection";

interface Props {
	category: CategoryProgress;
}

export function PerfectionRow({ category }: Props) {
	const [expanded, setExpanded] = useState(false);
	const isComplete = category.current >= category.total;
	const pct = category.total > 0 ? Math.min((category.current / category.total) * 100, 100) : 0;
	const barColor = isComplete ? "bg-green-400" : pct >= 60 ? "bg-accent" : "bg-red-400";
	const earnedPts =
		category.total > 0 ? (category.current / category.total) * category.weight : 0;
	const earnedPtsDisplay = Number.isInteger(earnedPts) ? earnedPts : earnedPts.toFixed(1);

	return (
		<li
			className={`list-none overflow-hidden rounded-lg border ${
				isComplete
					? "border-green-400/30 bg-green-400/12"
					: "cursor-pointer border-white/10 bg-white/5"
			}`}
		>
			<div
				role="button"
				tabIndex={isComplete ? -1 : 0}
				aria-expanded={!isComplete ? expanded : undefined}
				onClick={() => !isComplete && setExpanded(!expanded)}
				onKeyDown={(e) => {
					if (!isComplete && (e.key === "Enter" || e.key === " ")) setExpanded(!expanded);
				}}
				className={`flex w-full items-center gap-3 px-4 py-3 ${
					!isComplete ? "cursor-pointer hover:bg-white/5" : ""
				}`}
			>
				<div className="h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-white/10">
					<div
						className={`h-full rounded-full ${barColor}`}
						style={{ width: `${pct}%` }}
					/>
				</div>
				<span
					className={`flex-1 text-[0.8rem] font-bold ${isComplete ? "text-green-300" : "text-white/80"}`}
				>
					{category.name}
				</span>
				<span className="w-16 shrink-0 text-right text-[0.7rem] font-semibold text-white/80">
					{category.current} / {category.total}
				</span>
				<span className="w-8 shrink-0 text-right text-[0.7rem] font-semibold text-white/80">
					{Math.round(pct)}%
				</span>
				<span className="border-highlight/20 bg-highlight/10 text-highlight w-20 shrink-0 rounded-full border px-2 py-0.5 text-right text-[0.55rem] font-semibold">
					{earnedPtsDisplay} / {category.weight} pts
				</span>
				{isComplete ? (
					<HiCheck className="h-4 w-4 shrink-0 text-green-400" />
				) : expanded ? (
					<HiChevronUp className="h-4 w-4 shrink-0 text-white/40" />
				) : (
					<HiChevronDown className="h-4 w-4 shrink-0 text-white/40" />
				)}
			</div>

			{expanded && !isComplete && category.missing.length > 0 && (
				<div className="border-t border-white/10 px-4 py-3">
					<div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{category.missing.map((item) => (
							<div
								key={item.id}
								className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5"
							>
								{item.image ? (
									<img
										src={item.image}
										alt={item.name}
										className="h-7 w-7 shrink-0 object-contain"
									/>
								) : (
									<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-white/8 text-[0.5rem] text-white/40">
										?
									</div>
								)}
								<span className="truncate text-[0.6rem] font-semibold text-white/80">
									{item.name}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
		</li>
	);
}
