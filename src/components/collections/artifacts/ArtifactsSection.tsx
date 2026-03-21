"use client";

import { artifacts, type Artifact } from "stardew-valley-data";
import { useState, useMemo } from "react";
import { HiCheck } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { SearchField } from "@/comps/ui/SearchField";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/FilterPopover";
import { ArtifactDetailModal } from "./modals/ArtifactDetailModal";

interface Props {
	gameData: GameData;
}

type DonationFilter = "all" | "donated" | "not-donated";
type FoundFilter = "all" | "found" | "not-found";
type RewardFilter = "all" | "has-reward";

const allArtifacts = artifacts().get();

function ArtifactStatusBadge({ donated, found }: { donated: boolean; found: boolean }) {
	if (donated) {
		return (
			<span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[0.6rem] font-bold text-green-300 border border-green-500/30">
				<HiCheck className="h-2.5 w-2.5" /> Donated
			</span>
		);
	}
	if (found) {
		return (
			<span className="inline-flex shrink-0 items-center rounded-full bg-accent/20 px-2 py-0.5 text-[0.6rem] font-bold text-accent border border-accent/30">
				Found
			</span>
		);
	}
	return (
		<span className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/6 px-2 py-0.5 text-[0.6rem] font-bold text-white/40">
			Not Found
		</span>
	);
}

interface ArtifactCardProps {
	artifact: Artifact;
	donated: boolean;
	found: boolean;
	onClick: () => void;
}

function ArtifactCard({ artifact, donated, found, onClick }: ArtifactCardProps) {
	const borderBg = donated
		? "border-green-500/40 bg-green-900/20"
		: found
			? "border-accent/40 bg-accent/10"
			: "border-white/10 bg-white/5";
	const nameColor = donated ? "text-green-300" : found ? "text-accent" : "text-white";

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(artifact.image)}
					alt={artifact.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className={`text-sm font-bold leading-tight ${nameColor}`}>
						{artifact.name}
					</span>
					<div className="mt-0.5 text-[0.6rem] text-white/40">
						Click to see locations
					</div>
				</div>
				<ArtifactStatusBadge donated={donated} found={found} />
			</div>

			<PriceGrid price={artifact.sellPrice} maxQuality="normal" shipped={donated} />

			{artifact.donationNotes && (
				<div className="inline-flex items-center gap-1 rounded-full border border-highlight/30 bg-highlight/15 px-2 py-0.5 text-[0.6rem] font-bold text-highlight">
					★ Reward
				</div>
			)}
		</button>
	);
}

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
		(a) => gameData.artifacts[a.id]?.donated === true,
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
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				{/* Header */}
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
						Artifacts
					</h3>
					<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
						{donatedCount} / {allArtifacts.length} donated
					</span>
				</div>

				{/* Controls */}
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search artifacts…" />
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterGroup label="Donation Status">
								{(["all", "donated", "not-donated"] as DonationFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="artifact-donation"
										value={v}
										checked={donationFilter === v}
										onChange={() => setDonationFilter(v)}
									>
										{v === "all" ? "All" : v === "donated" ? "Donated" : "Not Donated"}
									</FilterRadio>
								))}
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
										{v === "all" ? "All" : v === "found" ? "Found" : "Not Found"}
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

				{/* Grid */}
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
			</div>

			<ArtifactDetailModal
				artifact={selectedArtifact}
				donated={selectedDonated}
				found={selectedFound}
				onClose={() => setSelectedArtifact(null)}
			/>
		</>
	);
}
