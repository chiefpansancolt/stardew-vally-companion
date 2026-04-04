"use client";

import { buildings } from "stardew-valley-data";
import { useState } from "react";
import { HiPlus, HiX } from "react-icons/hi";
import type { BuildingsEditStepProps } from "@/types";
import type { BuildingProgress } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";

const allBuildingTypes = buildings().get();

export function BuildingsEditStep({ buildings: initial, onChange }: BuildingsEditStepProps) {
	const [local, setLocal] = useState<BuildingProgress[]>([...initial]);

	function addBuilding(type: string) {
		const next = [...local, { id: `manual-${type}-${Date.now()}`, type, animalCount: 0 }];
		setLocal(next);
		onChange(next);
	}

	function removeBuilding(id: string) {
		const next = local.filter((b) => b.id !== id);
		setLocal(next);
		onChange(next);
	}

	function setAnimalCount(id: string, count: number) {
		const next = local.map((b) =>
			b.id === id ? { ...b, animalCount: Math.max(0, count) } : b
		);
		setLocal(next);
		onChange(next);
	}

	return (
		<div className="space-y-3">
			<p className="text-[0.7rem] font-semibold text-gray-500">
				{local.length} building{local.length !== 1 ? "s" : ""} on farm
			</p>

			<div className="space-y-2">
				{allBuildingTypes.map((buildingType) => {
					const owned = local.filter((b) => b.type === buildingType.name);
					return (
						<div
							key={buildingType.id}
							className={`rounded-xl border ${owned.length > 0 ? "border-primary/30 bg-primary/5" : "border-gray-200 bg-gray-50"}`}
						>
							<div className="flex items-center gap-2 p-2.5">
								<img
									src={assetPath(buildingType.image)}
									alt={buildingType.name}
									className="h-8 w-8 shrink-0 object-contain"
								/>
								<div className="min-w-0 flex-1">
									<div className="text-[0.65rem] font-bold text-gray-700">
										{buildingType.name}
									</div>
									{buildingType.animalCapacity != null &&
										buildingType.animalCapacity > 0 && (
											<div className="text-[0.6rem] text-gray-400">
												Capacity: {buildingType.animalCapacity}
											</div>
										)}
								</div>
								{owned.length > 0 && (
									<span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[0.6rem] font-bold">
										×{owned.length}
									</span>
								)}
								<button
									type="button"
									onClick={() => addBuilding(buildingType.name)}
									className="hover:border-primary/30 hover:bg-primary/10 hover:text-primary flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500"
								>
									<HiPlus className="h-3.5 w-3.5" />
								</button>
							</div>

							{owned.map((instance, idx) => (
								<div
									key={instance.id}
									className="border-primary/20 flex items-center gap-2 border-t px-2.5 py-1.5"
								>
									<span className="w-14 shrink-0 text-[0.6rem] font-semibold text-gray-500">
										#{idx + 1}
									</span>
									{buildingType.animalCapacity != null &&
									buildingType.animalCapacity > 0 ? (
										<div className="flex flex-1 items-center gap-1.5">
											<span className="text-[0.6rem] text-gray-500">
												Animals:
											</span>
											<input
												type="number"
												min={0}
												max={buildingType.animalCapacity}
												value={instance.animalCount}
												onChange={(e) =>
													setAnimalCount(
														instance.id,
														Math.min(
															buildingType.animalCapacity!,
															Number(e.target.value)
														)
													)
												}
												className="border-primary/30 focus:border-primary w-16 rounded border bg-white px-1.5 py-0.5 text-center text-[0.65rem] focus:outline-none"
											/>
											<span className="text-[0.6rem] text-gray-400">
												/ {buildingType.animalCapacity}
											</span>
										</div>
									) : (
										<div className="flex-1" />
									)}
									<button
										type="button"
										onClick={() => removeBuilding(instance.id)}
										className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-red-200 bg-white text-red-400 hover:bg-red-50"
									>
										<HiX className="h-3 w-3" />
									</button>
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
