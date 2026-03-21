"use client";

import { type Artifact, artifacts } from "stardew-valley-data";
import { useMemo, useState } from "react";
import {
	type DonationFilter,
	type FoundFilter,
	CollectionProps as Props,
	type RewardFilter,
} from "@/types";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { SearchField } from "@/comps/ui/SearchField";
import { ArtifactCard } from "./cards";
import { ArtifactDetailModal } from "./modals/ArtifactDetailModal";

const allArtifacts = artifacts().get();

export function ArtifactsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [donationFilter, setDonationFilter] = useState<DonationFilter>("all");
	const [foundFilter, setFoundFilter] = useState<FoundFilter>("all");
	const [rewardFilter, setRewardFilter] = useState<RewardFilter>("all");
	const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

	const activeFilterCount = [
		donationFilter !== "all",
		foundFilter !== "all",
		rewardFilter !== "all",
	].filter(Boolean).length;

	const donatedCount = allArtifacts.filter(
		(a) => gameData.artifacts[a.id]?.donated === true
	).length;

	const filtered = useMemo(() => {
		return allArtifacts
			.filter((a) => !search || a.name.toLowerCase().includes(search.toLowerCase()))
			.filter((a) => {
				const donated = gameData.artifacts[a.id]?.donated === true;
				if (donationFilter === "donated") return donated;
				if (donationFilter === "not-donated") return !donated;
				return true;
			})
			.filter((a) => {
				const found = gameData.artifacts[a.id]?.found === true;
				if (foundFilter === "found") return found;
				if (foundFilter === "not-found") return !found;
				return true;
			})
			.filter((a) => {
				if (rewardFilter === "has-reward") return a.donationNotes !== null;
				return true;
			});
	}, [search, donationFilter, foundFilter, rewardFilter, gameData.artifacts]);

	const selectedDonated = selectedArtifact
		? gameData.artifacts[selectedArtifact.id]?.donated === true
		: false;
	const selectedFound = selectedArtifact
		? gameData.artifacts[selectedArtifact.id]?.found === true
		: false;

	return (
		<>
			<NavySection
				title="Artifacts"
				badge={`${donatedCount} / ${allArtifacts.length} donated`}
			>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={search}
						onChange={setSearch}
						placeholder="Search artifacts…"
					/>
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterGroup label="Donation Status">
								{(["all", "donated", "not-donated"] as DonationFilter[]).map(
									(v) => (
										<FilterRadio
											key={v}
											name="artifact-donation"
											value={v}
											checked={donationFilter === v}
											onChange={() => setDonationFilter(v)}
										>
											{v === "all"
												? "All"
												: v === "donated"
													? "Donated"
													: "Not Donated"}
										</FilterRadio>
									)
								)}
							</FilterGroup>
							<FilterGroup label="Found Status">
								{(["all", "found", "not-found"] as FoundFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="artifact-found"
										value={v}
										checked={foundFilter === v}
										onChange={() => setFoundFilter(v)}
									>
										{v === "all"
											? "All"
											: v === "found"
												? "Found"
												: "Not Found"}
									</FilterRadio>
								))}
							</FilterGroup>
							<FilterGroup label="Reward">
								{(["all", "has-reward"] as RewardFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="artifact-reward"
										value={v}
										checked={rewardFilter === v}
										onChange={() => setRewardFilter(v)}
									>
										{v === "all" ? "All" : "Has Reward"}
									</FilterRadio>
								))}
							</FilterGroup>
						</div>
					</FilterPopover>
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						No artifacts match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((a) => (
							<ArtifactCard
								key={a.id}
								artifact={a}
								donated={gameData.artifacts[a.id]?.donated === true}
								found={gameData.artifacts[a.id]?.found === true}
								onClick={() => setSelectedArtifact(a)}
							/>
						))}
					</div>
				)}
			</NavySection>

			<ArtifactDetailModal
				artifact={selectedArtifact}
				donated={selectedDonated}
				found={selectedFound}
				onClose={() => setSelectedArtifact(null)}
			/>
		</>
	);
}
