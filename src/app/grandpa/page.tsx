"use client";

import { grandpaEvaluator } from "stardew-valley-data";
import { useMemo } from "react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { buildGrandpaInput } from "@/lib/pages/grandpa";
import { GrandpaEvaluationSection } from "@/comps/grandpa/GrandpaEvaluationSection";
import { GrandpaHero } from "@/comps/grandpa/GrandpaHero";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function GrandpaPage() {
	const { activePlaythrough } = usePlaythrough();

	const result = useMemo(() => {
		if (!activePlaythrough) return null;
		const input = buildGrandpaInput(activePlaythrough.data);
		return grandpaEvaluator().evaluate(input);
	}, [activePlaythrough]);

	if (!activePlaythrough || !result) {
		return <NoPlaythroughFallback feature="grandpa's evaluation" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Grandpa&apos;s Evaluation</h1>
				<p className="mt-1 text-gray-600">Year 3 farm evaluation criteria and progress</p>
			</div>

			<div className="flex flex-col gap-6">
				<GrandpaHero result={result} />
				<GrandpaEvaluationSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
