"use client";

import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { ArtifactsHero } from "@/comps/collections/artifacts/ArtifactsHero";
import { ArtifactsSection } from "@/comps/collections/artifacts/ArtifactsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function ArtifactsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="artifacts" />;
	}

	return (
		<div className="p-6">
			<PageHeader title="Artifacts" description="Museum artifacts — track which ones you've found and donated" />

			<div className="flex flex-col gap-6">
				<ArtifactsHero gameData={activePlaythrough.data} />
				<ArtifactsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
