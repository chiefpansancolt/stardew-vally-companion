"use client";

import { useState } from "react";
import type { CharacterCoreEditStepProps } from "@/types";
import type { CharacterInfo } from "@/types/app/game";

type DateSeason = "spring" | "summer" | "fall" | "winter";
import { SEASONS } from "@/data/constants/seasons";

const INPUT =
	"w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const LABEL = "mb-1 block text-xs font-semibold text-gray-500";

const HOUSE_LABELS = ["Starter", "Kitchen", "Kids Room", "Cellar"];

export function CharacterCoreEditStep({ character: initialCharacter, onChange }: CharacterCoreEditStepProps) {
	const [local, setLocal] = useState<CharacterInfo>(initialCharacter);

	function set<K extends keyof CharacterInfo>(key: K, value: CharacterInfo[K]) {
		const next = { ...local, [key]: value };
		setLocal(next);
		onChange(next);
	}

	function setDate<K extends keyof CharacterInfo["currentDate"]>(
		key: K,
		value: CharacterInfo["currentDate"][K]
	) {
		const next = { ...local, currentDate: { ...local.currentDate, [key]: value } };
		setLocal(next);
		onChange(next);
	}

	const character = local;

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
				<div>
					<label className={LABEL}>Farmer Name</label>
					<input
						type="text"
						value={character.name}
						onChange={(e) => set("name", e.target.value)}
						className={INPUT}
					/>
				</div>
				<div>
					<label className={LABEL}>Farm Name</label>
					<input
						type="text"
						value={character.farmName}
						onChange={(e) => set("farmName", e.target.value)}
						className={INPUT}
					/>
				</div>
				<div>
					<label className={LABEL}>Favorite Thing</label>
					<input
						type="text"
						value={character.favoriteThing}
						onChange={(e) => set("favoriteThing", e.target.value)}
						className={INPUT}
					/>
				</div>
				<div>
					<label className={LABEL}>Gender</label>
					<input
						type="text"
						value={character.gender}
						onChange={(e) => set("gender", e.target.value)}
						className={INPUT}
					/>
				</div>
				<div>
					<label className={LABEL}>Spouse</label>
					<input
						type="text"
						value={character.spouse}
						onChange={(e) => set("spouse", e.target.value)}
						className={INPUT}
					/>
				</div>
			</div>

			<div>
				<p className="mb-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
					Current Date
				</p>
				<div className="grid grid-cols-3 gap-3">
					<div>
						<label className={LABEL}>Season</label>
						<select
							value={character.currentDate.season}
							onChange={(e) => setDate("season", e.target.value as DateSeason)}
							className={INPUT}
						>
							{Object.values(SEASONS).map((s) => (
								<option key={s.id} value={s.id}>
									{s.label}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className={LABEL}>Day (1–28)</label>
						<input
							type="number"
							min={1}
							max={28}
							value={character.currentDate.day}
							onChange={(e) => setDate("day", Number(e.target.value))}
							className={INPUT}
						/>
					</div>
					<div>
						<label className={LABEL}>Year</label>
						<input
							type="number"
							min={1}
							value={character.currentDate.year}
							onChange={(e) => setDate("year", Number(e.target.value))}
							className={INPUT}
						/>
					</div>
				</div>
			</div>

			<div>
				<p className="mb-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
					House Level
				</p>
				<div className="flex gap-2">
					{HOUSE_LABELS.map((label, i) => (
						<button
							key={i}
							type="button"
							onClick={() => set("houseUpgradeLevel", i)}
							className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
								character.houseUpgradeLevel === i
									? "border-primary bg-primary text-white"
									: "border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200"
							}`}
						>
							{i}: {label}
						</button>
					))}
				</div>
			</div>

			<div>
				<p className="mb-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
					Stats
				</p>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
					<div>
						<label className={LABEL}>Money (g)</label>
						<input
							type="number"
							min={0}
							value={character.money}
							onChange={(e) => set("money", Number(e.target.value))}
							className={INPUT}
						/>
					</div>
					<div>
						<label className={LABEL}>Total Earned (g)</label>
						<input
							type="number"
							min={0}
							value={character.totalMoneyEarned}
							onChange={(e) => set("totalMoneyEarned", Number(e.target.value))}
							className={INPUT}
						/>
					</div>
					<div>
						<label className={LABEL}>Max Health</label>
						<input
							type="number"
							min={0}
							value={character.maxHealth}
							onChange={(e) => set("maxHealth", Number(e.target.value))}
							className={INPUT}
						/>
					</div>
					<div>
						<label className={LABEL}>Max Energy</label>
						<input
							type="number"
							min={0}
							value={character.maxEnergy}
							onChange={(e) => set("maxEnergy", Number(e.target.value))}
							className={INPUT}
						/>
					</div>
					<div>
						<label className={LABEL}>Luck Level</label>
						<input
							type="number"
							step={0.01}
							value={character.luckLevel}
							onChange={(e) => set("luckLevel", Number(e.target.value))}
							className={INPUT}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
