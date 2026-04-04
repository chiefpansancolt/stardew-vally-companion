"use client";

import { animals, isPet } from "stardew-valley-data";
import { useState } from "react";
import { HiCheck, HiPlus, HiStar, HiX } from "react-icons/hi";
import type { PetsEditStepProps } from "@/types";
import type { PetProgress } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

const allPetData = animals().pets().get().filter(isPet);

const petsByType = allPetData.reduce<Record<string, typeof allPetData>>((acc, p) => {
	if (!acc[p.name]) acc[p.name] = [];
	acc[p.name].push(p);
	return acc;
}, {});

const petTypeNames = Object.keys(petsByType);

function getPetImage(type: string, breed: string): string | null {
	const group = petsByType[type] ?? [];
	if (group.length === 0) return null;
	const match = group.find((p) => "variant" in p && String(p.variant) === breed) ?? group[0];
	return match?.image ?? null;
}

interface AddPetForm {
	type: string;
	variant: number;
	name: string;
	friendship: number;
	starter: boolean;
}

const DEFAULT_FORM: AddPetForm = {
	type: petTypeNames[0] ?? "Cat",
	variant: 1,
	name: "",
	friendship: 0,
	starter: false,
};

export function PetsEditStep({ pets: initial, onChange }: PetsEditStepProps) {
	const [local, setLocal] = useState<PetProgress[]>([...initial]);
	const [adding, setAdding] = useState(false);
	const [form, setForm] = useState<AddPetForm>(DEFAULT_FORM);

	function update(idx: number, patch: Partial<PetProgress>) {
		let next = local.map((p, i) => (i === idx ? { ...p, ...patch } : p));
		if (patch.starter === true) {
			next = next.map((p, i) => (i !== idx ? { ...p, starter: false } : p));
		}
		setLocal(next);
		onChange(next);
	}

	function removePet(idx: number) {
		const next = local.filter((_, i) => i !== idx);
		setLocal(next);
		onChange(next);
	}

	function openAddForm() {
		setForm(DEFAULT_FORM);
		setAdding(true);
	}

	function confirmAdd() {
		if (!form.name.trim()) return;
		const group = petsByType[form.type] ?? [];
		const petData = group.find((p) => "variant" in p && p.variant === form.variant) ?? group[0];
		const breed = petData && "variant" in petData ? String(petData.variant) : "";
		const isHorse = form.type === "Horse";
		const newPet: PetProgress = {
			name: form.name.trim(),
			type: form.type,
			breed,
			friendship: isHorse ? null : form.friendship,
			starter: form.starter,
		};
		let next = [...local, newPet];
		if (form.starter) {
			next = next.map((p, i) => (i !== next.length - 1 ? { ...p, starter: false } : p));
		}
		setLocal(next);
		onChange(next);
		setAdding(false);
	}

	const selectedGroup = petsByType[form.type] ?? [];
	const hasVariants = selectedGroup.length > 1;
	const isHorseForm = form.type === "Horse";
	const isStarterEligibleForm = form.type === "Cat" || form.type === "Dog";

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<p className="text-[0.7rem] font-semibold text-gray-500">
					{local.length} pet{local.length !== 1 ? "s" : ""}
				</p>
				{!adding && (
					<button
						type="button"
						onClick={openAddForm}
						className="border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-[0.65rem] font-semibold"
					>
						<HiPlus className="h-3 w-3" />
						Add Pet
					</button>
				)}
			</div>

			{adding && (
				<div className="border-primary/30 bg-primary/5 space-y-2.5 rounded-xl border p-3">
					<p className="text-primary text-[0.65rem] font-bold">New Pet</p>

					<div className="grid grid-cols-2 gap-2">
						<div className="space-y-1">
							<label className="text-[0.6rem] font-semibold text-gray-500">
								Type
							</label>
							<select
								value={form.type}
								onChange={(e) =>
									setForm((f) => ({ ...f, type: e.target.value, variant: 1 }))
								}
								className="focus:border-primary w-full cursor-pointer rounded border border-gray-300 bg-white px-1.5 py-1 text-[0.65rem] focus:outline-none"
							>
								{petTypeNames.map((t) => (
									<option key={t} value={t}>
										{t}
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
								placeholder="e.g. Mittens"
								className="focus:border-primary w-full rounded border border-gray-300 bg-white px-1.5 py-1 text-[0.65rem] focus:outline-none"
							/>
						</div>
					</div>

					{hasVariants && (
						<div className="space-y-1">
							<label className="text-[0.6rem] font-semibold text-gray-500">
								Variant
							</label>
							<div className="flex flex-wrap gap-1.5">
								{selectedGroup.map((p) => {
									const variant = "variant" in p ? p.variant : 1;
									const selected = form.variant === variant;
									return (
										<button
											key={p.id}
											type="button"
											onClick={() =>
												setForm((f) => ({ ...f, variant: variant ?? 1 }))
											}
											className={`cursor-pointer rounded-lg border p-1 transition-colors ${
												selected
													? "border-primary/50 bg-primary/10"
													: "border-gray-200 bg-white hover:border-gray-300"
											}`}
										>
											<img
												src={assetPath(p.image)}
												alt={`${p.name} ${variant}`}
												className="h-8 w-8 object-contain"
											/>
										</button>
									);
								})}
							</div>
						</div>
					)}

					<div className="grid grid-cols-2 gap-2">
						{!isHorseForm && (
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
						)}

						{isStarterEligibleForm && (
							<div className="space-y-1">
								<label className="text-[0.6rem] font-semibold text-gray-500">
									Starter
								</label>
								<button
									type="button"
									onClick={() => setForm((f) => ({ ...f, starter: !f.starter }))}
									className={`flex w-full cursor-pointer items-center gap-1.5 rounded border px-2 py-1 text-[0.65rem] font-semibold transition-colors ${
										form.starter
											? "border-highlight/40 bg-highlight/10 text-amber-600"
											: "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
									}`}
								>
									<HiStar
										className={`h-3 w-3 ${form.starter ? "text-highlight" : ""}`}
									/>
									{form.starter ? "Yes" : "No"}
								</button>
							</div>
						)}
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
					No pets yet. Use the button above to add one.
				</p>
			)}

			<div className="space-y-2">
				{local.map((pet, idx) => {
					const image = getPetImage(pet.type, pet.breed);
					const isHorse = pet.type === "Horse";
					const isStarterEligible = pet.type === "Cat" || pet.type === "Dog";
					return (
						<div
							key={`${pet.name}-${idx}`}
							className={`flex items-center gap-3 rounded-xl border p-2.5 transition-colors ${
								pet.starter
									? "border-highlight/40 bg-highlight/5"
									: "border-gray-200 bg-gray-50"
							}`}
						>
							{image && (
								<img
									src={assetPath(image)}
									alt={pet.type}
									className="h-8 w-8 shrink-0 object-contain"
								/>
							)}
							<div className="min-w-0 flex-1">
								<div className="flex items-center gap-1.5">
									<span className="text-xs font-bold text-gray-700">
										{pet.name}
									</span>
									{pet.starter && isStarterEligible && (
										<HiStar className="text-highlight h-3 w-3" />
									)}
								</div>
								<div className="text-[0.6rem] text-gray-400 capitalize">
									{pet.type}
									{pet.breed ? ` · variant ${pet.breed}` : ""}
								</div>
							</div>
							<div className="flex shrink-0 items-center gap-1.5">
								{!isHorse && (
									<>
										<span className="text-[0.6rem] text-gray-500">
											Friendship:
										</span>
										<input
											type="number"
											min={0}
											max={1000}
											value={pet.friendship ?? 0}
											onChange={(e) =>
												update(idx, {
													friendship: Math.min(
														1000,
														Math.max(0, Number(e.target.value))
													),
												})
											}
											className="focus:border-primary w-14 rounded border border-gray-300 px-1.5 py-0.5 text-center text-xs focus:outline-none"
										/>
									</>
								)}
								{isStarterEligible && (
									<button
										type="button"
										title={pet.starter ? "Starter pet" : "Set as starter"}
										onClick={() => update(idx, { starter: !pet.starter })}
										className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded border transition-colors ${
											pet.starter
												? "border-highlight/40 bg-highlight/10 text-highlight"
												: "border-gray-300 bg-white text-gray-400 hover:bg-gray-100"
										}`}
									>
										<HiStar className="h-3.5 w-3.5" />
									</button>
								)}
								<button
									type="button"
									onClick={() => removePet(idx)}
									className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-red-200 bg-white text-red-400 hover:bg-red-50"
								>
									<HiX className="h-3 w-3" />
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
