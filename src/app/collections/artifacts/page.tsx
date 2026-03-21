"use client";

import { Card } from "flowbite-react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { ArtifactsHero } from "@/comps/collections/artifacts/ArtifactsHero";
import { ArtifactsSection } from "@/comps/collections/artifacts/ArtifactsSection";

export default function ArtifactsPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return (
			<div className="p-6">
				<Card className="py-16 text-center">
					<div className="mx-auto max-w-md">
						<h2 className="mb-2 text-xl font-semibold text-gray-700">
							No Active Playthrough
						</h2>
						<p className="text-gray-500">
							Select or create a playthrough to view artifacts.
						</p>
					</div>
				</Card>
			</div>
		);
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
