"use client";

import { type GeodeContainer, type MineralItem, minerals } from "stardew-valley-data";
import { useMemo, useState } from "react";
import { type DonationFilter, type FoundFilter, CollectionProps as Props } from "@/types";
import { applyBestProfessionBonus, getActiveProfessionBonuses } from "@/lib/utils/professionPrices";
import { FilterGroup, FilterPopover, FilterRadio } from "@/comps/ui/filter-popover";
import { NavySection } from "@/comps/ui/NavySection";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import { SearchField } from "@/comps/ui/SearchField";
import { MineralCard } from "./cards";
import { MineralDetailModal } from "./modals/MineralDetailModal";

const allMineralItems = minerals().mineralItems().get() as MineralItem[];
const allGeodes = minerals().geodes().get() as GeodeContainer[];

const mineralToGeodes: Record<string, string[]> = {};
for (const geode of allGeodes) {
	const contents = minerals().fromGeode(geode.name).mineralItems().get() as MineralItem[];
	for (const mineral of contents) {
		(mineralToGeodes[mineral.id] ??= []).push(geode.name);
	}
}

export function MineralItemsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [donationFilter, setDonationFilter] = useState<DonationFilter>("all");
	const [foundFilter, setFoundFilter] = useState<FoundFilter>("all");
	const [showProfessions, setShowProfessions] = useState(false);
	const [selectedMineral, setSelectedMineral] = useState<MineralItem | null>(null);

	const activeFilterCount = [donationFilter !== "all", foundFilter !== "all"].filter(
		Boolean
	).length;

	const donatedCount = allMineralItems.filter(
		(m) => gameData.minerals[m.id]?.donated === true
	).length;

	const activeBonuses = useMemo(
		() => (showProfessions ? getActiveProfessionBonuses(gameData) : new Set()),
		[showProfessions, gameData]
	);

	const filtered = useMemo(() => {
		return allMineralItems
			.filter((m) => !search || m.name.toLowerCase().includes(search.toLowerCase()))
			.filter((m) => {
				const donated = gameData.minerals[m.id]?.donated === true;
				if (donationFilter === "donated") return donated;
				if (donationFilter === "not-donated") return !donated;
				return true;
			})
			.filter((m) => {
				const found = gameData.minerals[m.id]?.found === true;
				if (foundFilter === "found") return found;
				if (foundFilter === "not-found") return !found;
				return true;
			});
	}, [search, donationFilter, foundFilter, gameData.minerals]);

	const selectedDonated = selectedMineral
		? gameData.minerals[selectedMineral.id]?.donated === true
		: false;
	const selectedFound = selectedMineral
		? gameData.minerals[selectedMineral.id]?.found === true
		: false;
	const selectedGeodes = selectedMineral ? (mineralToGeodes[selectedMineral.id] ?? []) : [];
	const selectedBonus = selectedMineral
		? applyBestProfessionBonus(
				selectedMineral.sellPrice,
				selectedMineral.profession,
				activeBonuses as ReturnType<typeof getActiveProfessionBonuses>
			)
		: null;

	return (
		<>
			<NavySection
				title="Minerals"
				badge={`${donatedCount} / ${allMineralItems.length} donated`}
			>
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField
						value={search}
						onChange={setSearch}
						placeholder="Search minerals…"
					/>
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterGroup label="Donation Status">
								{(["all", "donated", "not-donated"] as DonationFilter[]).map(
									(v) => (
										<FilterRadio
											key={v}
											name="mineral-donation"
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
										name="mineral-found"
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
						</div>
					</FilterPopover>
					<ProfessionsButton
						active={showProfessions}
						onClick={() => setShowProfessions((p) => !p)}
					/>
				</div>

				{filtered.length === 0 ? (
					<p className="py-8 text-center text-sm text-white/40">
						No minerals match your filters.
					</p>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{filtered.map((m) => {
							const donated = gameData.minerals[m.id]?.donated === true;
							const found = gameData.minerals[m.id]?.found === true;
							const bonus = showProfessions
								? applyBestProfessionBonus(
										m.sellPrice,
										m.profession,
										activeBonuses as ReturnType<
											typeof getActiveProfessionBonuses
										>
									)
								: null;
							return (
								<MineralCard
									key={m.id}
									mineral={m}
									donated={donated}
									found={found}
									geodeNames={mineralToGeodes[m.id] ?? []}
									professionBonus={bonus}
									onClick={() => setSelectedMineral(m)}
								/>
							);
						})}
					</div>
				)}
			</NavySection>

			<MineralDetailModal
				mineral={selectedMineral}
				donated={selectedDonated}
				found={selectedFound}
				geodeNames={selectedGeodes}
				professionBonus={selectedBonus}
				onClose={() => setSelectedMineral(null)}
			/>
		</>
	);
}
