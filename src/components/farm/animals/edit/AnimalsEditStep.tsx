"use client";

import { animals, isFarmAnimal } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiLockClosed, HiPlus, HiX } from "react-icons/hi";
import type { AnimalsEditStepProps } from "@/types";
import type { BuildingProgress, FarmAnimalProgress } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

const allSpecies = animals().farmAnimals().get().filter(isFarmAnimal);
const speciesMap = new Map(allSpecies.map((s) => [s.name, s]));

function getCompatibleBuildings(
	baseBuilding: string,
	allBuildings: BuildingProgress[]
): BuildingProgress[] {
	const lc = baseBuilding.toLowerCase();
	return allBuildings.filter((b) => b.type.toLowerCase().includes(lc));
}

function buildingLabel(allBuildings: BuildingProgress[], id: string): string {
	const building = allBuildings.find((b) => b.id === id);
	if (!building) return "—";
	const sameType = allBuildings.filter((b) => b.type === building.type);
	const idx = sameType.findIndex((b) => b.id === id);
	return sameType.length > 1 ? `${building.type} #${idx + 1}` : building.type;
}

interface AddAnimalForm {
	speciesName: string;
	name: string;
	friendship: number;
	buildingId: string;
}

const DEFAULT_FORM: AddAnimalForm = {
	speciesName: allSpecies[0]?.name ?? "",
	name: "",
	friendship: 0,
	buildingId: "",
};

export function AnimalsEditStep({ animals: initial, buildings, onChange }: AnimalsEditStepProps) {
	const [local, setLocal] = useState<FarmAnimalProgress[]>([...initial]);
	const [adding, setAdding] = useState(false);
	const [form, setForm] = useState<AddAnimalForm>(DEFAULT_FORM);

	function update(id: string, patch: Partial<FarmAnimalProgress>) {
		const next = local.map((a) => (a.id === id ? { ...a, ...patch } : a));
		setLocal(next);
		onChange(next);
	}

	function removeAnimal(id: string) {
		const next = local.filter((a) => a.id !== id);
		setLocal(next);
		onChange(next);
	}

	function openAddForm() {
		setForm(DEFAULT_FORM);
		setAdding(true);
	}

	function confirmAdd() {
		const species = speciesMap.get(form.speciesName);
		if (!species || !form.name.trim()) return;
		const selectedBuilding = buildings.find((b) => b.id === form.buildingId);
		const newAnimal: FarmAnimalProgress = {
			id: `manual-animal-${Date.now()}`,
			name: form.name.trim(),
			type: species.name,
			buildingType: selectedBuilding?.type ?? species.building,
			buildingId: form.buildingId,
			friendship: form.friendship,
			happiness: 255,
			age: 0,
			hasAnimalCracker: false,
		};
		const next = [...local, newAnimal];
		setLocal(next);
		onChange(next);
		setAdding(false);
	}

	const selectedSpecies = speciesMap.get(form.speciesName);
	const compatibleForForm = selectedSpecies
		? getCompatibleBuildings(selectedSpecies.building, buildings)
		: [];

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<p className="text-[0.7rem] font-semibold text-gray-500">
					{local.length} animal{local.length !== 1 ? "s" : ""}
				</p>
				{!adding && (
					<button
						type="button"
						onClick={openAddForm}
						className="border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-[0.65rem] font-semibold"
					>
						<HiPlus className="h-3 w-3" />
						Add Animal
					</button>
				)}
			</div>

			{adding && (
				<div className="border-primary/30 bg-primary/5 space-y-2.5 rounded-xl border p-3">
					<p className="text-primary text-[0.65rem] font-bold">New Animal</p>

					<div className="grid grid-cols-2 gap-2">
						<div className="space-y-1">
							<label className="text-[0.6rem] font-semibold text-gray-500">
								Species
							</label>
							<select
								value={form.speciesName}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										speciesName: e.target.value,
										buildingId: "",
									}))
								}
								className="focus:border-primary w-full cursor-pointer rounded border border-gray-300 bg-white px-1.5 py-1 text-[0.65rem] focus:outline-none"
							>
								{allSpecies.map((s) => (
									<option key={s.id} value={s.name}>
										{s.name}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-1">
							<label className="text-[0.6rem] font-semibold text-gray-500">
								Name
							</label>
							<input
								type="text"
								value={form.name}
								onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
								placeholder="e.g. Bessie"
								className="focus:border-primary w-full rounded border border-gray-300 bg-white px-1.5 py-1 text-[0.65rem] focus:outline-none"
							/>
						</div>

						<div className="space-y-1">
							<label className="text-[0.6rem] font-semibold text-gray-500">
								Friendship (0–1000)
							</label>
							<input
								type="number"
								min={0}
								max={1000}
								value={form.friendship}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										friendship: Math.min(
											1000,
											Math.max(0, Number(e.target.value))
										),
									}))
								}
								className="focus:border-primary w-full rounded border border-gray-300 bg-white px-1.5 py-1 text-center text-[0.65rem] focus:outline-none"
							/>
						</div>

						<div className="space-y-1">
							<label className="text-[0.6rem] font-semibold text-gray-500">
								Building
							</label>
							{compatibleForForm.length > 0 ? (
								<select
									value={form.buildingId}
									onChange={(e) =>
										setForm((f) => ({ ...f, buildingId: e.target.value }))
									}
									className="focus:border-primary w-full cursor-pointer rounded border border-gray-300 bg-white px-1.5 py-1 text-[0.65rem] focus:outline-none"
								>
									<option value="">— none —</option>
									{compatibleForForm.map((b) => (
										<option key={b.id} value={b.id}>
											{buildingLabel(buildings, b.id)}
										</option>
									))}
								</select>
							) : (
								<div className="rounded border border-gray-200 bg-white px-1.5 py-1 text-[0.6rem] text-gray-400 italic">
									No compatible buildings
								</div>
							)}
						</div>
					</div>

					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={() => setAdding(false)}
							className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-1 text-[0.65rem] font-semibold text-gray-600 hover:bg-gray-50"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={confirmAdd}
							disabled={!form.name.trim()}
							className="border-primary/40 bg-primary hover:bg-primary/90 cursor-pointer rounded-lg border px-3 py-1 text-[0.65rem] font-semibold text-white disabled:opacity-40"
						>
							Add
						</button>
					</div>
				</div>
			)}

			{local.length === 0 && !adding && (
				<p className="py-4 text-center text-sm text-gray-400">
					No farm animals yet. Use the button above to add one.
				</p>
			)}

			<div className="space-y-2">
				{local.map((animal) => {
					const species = speciesMap.get(animal.type);
					const compatible = getCompatibleBuildings(
						species?.building ??
							(animal.buildingType?.toLowerCase().includes("coop") ? "Coop" : "Barn"),
						buildings
					);
					return (
						<div
							key={animal.id}
							className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-2.5"
						>
							{species?.image && (
								<img
									src={assetPath(species.image)}
									alt={animal.type}
									className="h-8 w-8 shrink-0 object-contain"
								/>
							)}
							<div className="min-w-0 flex-1">
								<div className="text-xs font-bold text-gray-700">{animal.name}</div>
								<div className="text-[0.6rem] text-gray-400">{animal.type}</div>
								{compatible.length > 0 ? (
									<select
										value={animal.buildingId}
										onChange={(e) =>
											update(animal.id, {
												buildingId: e.target.value,
												buildingType:
													buildings.find((b) => b.id === e.target.value)
														?.type ?? animal.buildingType,
											})
										}
										className="focus:border-primary mt-1 w-full cursor-pointer rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[0.6rem] focus:outline-none"
									>
										<option value="">— no building —</option>
										{compatible.map((b) => (
											<option key={b.id} value={b.id}>
												{buildingLabel(buildings, b.id)}
											</option>
										))}
									</select>
								) : (
									<div className="mt-1 text-[0.6rem] text-gray-400 italic">
										No compatible buildings on farm
									</div>
								)}
							</div>
							<div className="flex shrink-0 flex-col items-end gap-1.5">
								<div className="flex items-center gap-1.5">
									<span className="text-[0.6rem] text-gray-500">Friendship:</span>
									<input
										type="number"
										min={0}
										max={1000}
										value={animal.friendship}
										onChange={(e) =>
											update(animal.id, {
												friendship: Math.min(
													1000,
													Math.max(0, Number(e.target.value))
												),
											})
										}
										className="focus:border-primary w-16 rounded border border-gray-300 px-1.5 py-0.5 text-center text-xs focus:outline-none"
									/>
								</div>
								<div className="flex items-center gap-1.5">
									<button
										type="button"
										onClick={() =>
											update(animal.id, {
												hasAnimalCracker: !animal.hasAnimalCracker,
											})
										}
										className={`flex cursor-pointer items-center gap-1 rounded border px-1.5 py-0.5 text-[0.6rem] font-semibold transition-colors ${
											animal.hasAnimalCracker
												? "border-accent/40 bg-accent/10 text-accent"
												: "border-gray-200 bg-white text-gray-500 hover:bg-gray-100"
										}`}
									>
										{animal.hasAnimalCracker ? (
											<HiCheck className="inline h-3 w-3" />
										) : (
											<HiLockClosed className="inline h-3 w-3" />
										)}{" "}
										Cracker
									</button>
									<button
										type="button"
										onClick={() => removeAnimal(animal.id)}
										className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-red-200 bg-white text-red-400 hover:bg-red-50"
									>
										<HiX className="h-3 w-3" />
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
