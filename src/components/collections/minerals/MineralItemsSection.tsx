"use client";

import { minerals, type MineralItem, type GeodeContainer } from "stardew-valley-data";
import { useState, useMemo } from "react";
import { HiCheck } from "react-icons/hi";
import { type GameData } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { PriceGrid } from "@/comps/ui/PriceGrid";
import { SearchField } from "@/comps/ui/SearchField";
import { FilterPopover, FilterGroup, FilterRadio } from "@/comps/ui/FilterPopover";
import { ProfessionsButton } from "@/comps/ui/ProfessionsButton";
import {
	getActiveProfessionBonuses,
	applyBestProfessionBonus,
	type BonusResult,
} from "@/lib/utils/professionPrices";
import { MineralDetailModal } from "./modals/MineralDetailModal";

interface Props {
	gameData: GameData;
}

type DonationFilter = "all" | "donated" | "not-donated";
type FoundFilter = "all" | "found" | "not-found";

const allMineralItems = minerals().mineralItems().get() as MineralItem[];
const allGeodes = minerals().geodes().get() as GeodeContainer[];

const mineralToGeodes: Record<string, string[]> = {};
for (const geode of allGeodes) {
	const contents = minerals().fromGeode(geode.name).mineralItems().get() as MineralItem[];
	for (const mineral of contents) {
		(mineralToGeodes[mineral.id] ??= []).push(geode.name);
	}
}

function MineralStatusBadge({ donated, found }: { donated: boolean; found: boolean }) {
	if (donated) {
		return (
			<span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-green-500/30 bg-green-500/20 px-2 py-0.5 text-[0.6rem] font-bold text-green-300">
				<HiCheck className="h-2.5 w-2.5" /> Donated
			</span>
		);
	}
	if (found) {
		return (
			<span className="inline-flex shrink-0 items-center rounded-full border border-accent/30 bg-accent/20 px-2 py-0.5 text-[0.6rem] font-bold text-accent">
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

interface CardProps {
	mineral: MineralItem;
	donated: boolean;
	found: boolean;
	geodeNames: string[];
	professionBonus: BonusResult | null;
	onClick: () => void;
}

function MineralCard({ mineral, donated, found, geodeNames, professionBonus, onClick }: CardProps) {
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
					src={assetPath(mineral.image)}
					alt={mineral.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className={`text-sm font-bold leading-tight ${nameColor}`}>
						{mineral.name}
					</span>
					<div className="mt-0.5 text-[0.6rem] text-white/40">Click to see locations</div>
				</div>
				<MineralStatusBadge donated={donated} found={found} />
			</div>

			{geodeNames.length > 0 && (
				<div className="flex flex-wrap gap-1">
					{geodeNames.map((name) => (
						<span
							key={name}
							className="rounded-full border border-white/15 bg-white/8 px-2 py-0.5 text-[0.55rem] font-semibold text-white/55"
						>
							{name}
						</span>
					))}
				</div>
			)}

			<PriceGrid
				price={mineral.sellPrice}
				maxQuality="normal"
				shipped={donated}
				professionBonus={professionBonus}
			/>
		</button>
	);
}

export function MineralItemsSection({ gameData }: Props) {
	const [search, setSearch] = useState("");
	const [donationFilter, setDonationFilter] = useState<DonationFilter>("all");
	const [foundFilter, setFoundFilter] = useState<FoundFilter>("all");
	const [showProfessions, setShowProfessions] = useState(false);
	const [selectedMineral, setSelectedMineral] = useState<MineralItem | null>(null);

	const activeFilterCount = [donationFilter !== "all", foundFilter !== "all"].filter(
		Boolean,
	).length;

	const donatedCount = allMineralItems.filter(
		(m) => gameData.minerals[m.id]?.donated === true,
	).length;

	const activeBonuses = useMemo(
		() => (showProfessions ? getActiveProfessionBonuses(gameData) : new Set()),
		[showProfessions, gameData],
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
				activeBonuses as ReturnType<typeof getActiveProfessionBonuses>,
			)
		: null;

	return (
		<>
			<div
				className="border-secondary/60 rounded-xl border p-5"
				style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
			>
				<div className="mb-4 flex items-center justify-between">
					<h3 className="text-[0.8125rem] font-bold tracking-wide text-white uppercase">
						Minerals
					</h3>
					<span className="bg-highlight/20 text-highlight rounded-full px-3 py-0.5 text-[0.7rem] font-semibold">
						{donatedCount} / {allMineralItems.length} donated
					</span>
				</div>

				<div className="mb-4 flex flex-wrap items-center gap-3">
					<SearchField value={search} onChange={setSearch} placeholder="Search minerals…" />
					<FilterPopover activeCount={activeFilterCount}>
						<div className="flex flex-col gap-3">
							<FilterGroup label="Donation Status">
								{(["all", "donated", "not-donated"] as DonationFilter[]).map((v) => (
									<FilterRadio
										key={v}
										name="mineral-donation"
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
										name="mineral-found"
										value={v}
										checked={foundFilter === v}
										onChange={() => setFoundFilter(v)}
									>
										{v === "all" ? "All" : v === "found" ? "Found" : "Not Found"}
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
										activeBonuses as ReturnType<typeof getActiveProfessionBonuses>,
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
			</div>

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
