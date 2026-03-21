"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { ArtifactsHero } from "@/comps/collections/artifacts/ArtifactsHero";
import { ArtifactsSection } from "@/comps/collections/artifacts/ArtifactsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";

export default function ArtifactsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="artifacts" />;
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Artifacts</h1>
				<p className="mt-1 text-gray-600">
					Museum artifacts — track which ones you&apos;ve found and donated
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<ArtifactsHero gameData={activePlaythrough.data} />
				<ArtifactsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
