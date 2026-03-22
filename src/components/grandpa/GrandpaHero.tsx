"use client";

import { FaClipboardList } from "react-icons/fa";
import { TbCandle, TbCandleFilled } from "react-icons/tb";
import type { GrandpaHeroProps as Props } from "@/types";
import {
	CANDLE_THRESHOLDS,
	GRANDPA_CATEGORY_META,
	GRANDPA_CATEGORY_ORDER,
} from "@/data/constants/grandpa";
import { StatTile } from "@/comps/ui/StatTile";

export function GrandpaHero({ result }: Props) {
	const categoriesComplete = GRANDPA_CATEGORY_ORDER.filter((cat) => {
		const entries = result.breakdown.filter((e) => e.category === cat);
		const earned = entries.reduce((sum, e) => sum + e.points, 0);
		const max = entries.reduce((sum, e) => sum + e.maxPoints, 0);
		return earned === max && max > 0;
	}).length;

	return (
		<div className="rounded-xl border border-[#d6d0bc] bg-white p-6 shadow-sm">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<FaClipboardList className="h-7 w-7 text-gray-400" />
					<div>
						<div className="text-lg font-bold text-gray-900">
							Grandpa&apos;s Evaluation
						</div>
						<div className="mt-0.5 text-sm text-gray-500">
							Year 3 farm evaluation progress
						</div>
					</div>
				</div>

				<div className="flex items-center gap-4">
					{CANDLE_THRESHOLDS.map(({ candle, points }) => {
						const lit = candle <= result.candles;
						return (
							<div key={candle} className="flex flex-col items-center gap-1">
								{lit ? (
									<TbCandleFilled className="text-accent h-8 w-8" />
								) : (
									<TbCandle className="h-8 w-8 text-gray-300" />
								)}
								<span
									className={`text-[0.625rem] font-semibold ${lit ? "text-[#a07c10]" : "text-gray-400"}`}
								>
									{points}+ pts
								</span>
							</div>
						);
					})}
				</div>
			</div>

			<div
				className="grid gap-2"
				style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
			>
				<StatTile
					label="Score"
					value={result.score}
					valueColor={result.score >= 12 ? "text-green-600" : "text-accent"}
					suffix={`/ ${result.maxScore}`}
				/>
				<StatTile
					label="Candles"
					value={result.candles}
					valueColor={result.candles === 4 ? "text-green-600" : "text-accent"}
					suffix="/ 4"
				/>
				<StatTile
					label="Categories"
					value={categoriesComplete}
					valueColor={categoriesComplete === 6 ? "text-green-600" : "text-accent"}
					suffix={`/ ${GRANDPA_CATEGORY_ORDER.length}`}
				/>
			</div>
		</div>
	);
}
