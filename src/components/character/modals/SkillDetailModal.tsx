"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { cooking, crafting, professions, type Skill } from "stardew-valley-data";
import { HiCheck } from "react-icons/hi";
import { assetPath } from "@/lib/utils/assetPath";

interface Props {
	skill: Skill;
	currentLevel: number;
	chosenProfessionIds: string[];
	isOpen: boolean;
	onClose: () => void;
}

function getRecipeImage(name: string): string | null {
	const r = crafting().findByName(name) ?? cooking().findByName(name);
	return r ? assetPath(r.image) : null;
}

function RecipeItem({ name, reached }: { name: string; reached: boolean }) {
	const img = getRecipeImage(name);
	return (
		<div className="flex items-center gap-1.5">
			{img ? (
				<img src={img} alt={name} className="h-5 w-5 shrink-0 rounded object-contain" />
			) : (
				<div className="h-5 w-5 shrink-0 rounded bg-gray-200" />
			)}
			<span
				className={`text-[0.6875rem] leading-tight ${reached ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"}`}
			>
				{name}
			</span>
		</div>
	);
}

function ProfOption({
	profId,
	skillName,
	chosen,
	dimmed,
}: {
	profId: string;
	skillName: string;
	chosen: boolean;
	dimmed: boolean;
}) {
	const prof = professions().find(profId);
	if (!prof) return null;
	return (
		<div
			className={`flex flex-1 flex-col gap-1 p-2 ${chosen ? "bg-primary/5 dark:bg-primary/10" : ""} ${dimmed ? "opacity-40" : ""}`}
		>
			<div className="flex items-center gap-1.5">
				<div className="text-[0.6875rem] font-bold text-gray-800 dark:text-gray-200">
					{prof.name}
					{chosen && <HiCheck className="ml-1 inline h-3 w-3" />}
				</div>
			</div>
			<div className="text-[0.6rem] leading-snug text-gray-500 dark:text-gray-400">
				{prof.description}
			</div>
		</div>
	);
}

interface LevelBlockProps {
	skill: Skill;
	levelNum: number;
	reached: boolean;
	chosenProfessionIds: string[];
}

function LevelBlock({ skill, levelNum, reached, chosenProfessionIds }: LevelBlockProps) {
	const levelData = skill.levels[levelNum - 1];
	const allProfs = professions()
		.bySkill(skill.name as "Farming" | "Mining" | "Foraging" | "Fishing" | "Combat")
		.get();
	const lv5Profs = allProfs.filter((p) => p.level === 5);
	const lv10Profs = allProfs.filter((p) => p.level === 10);

	if (levelNum === 5) {
		return (
			<div className="flex flex-col border-r border-gray-300 last:border-r-0 dark:border-gray-600">
				<div
					className={`flex h-8 items-center justify-center border-b border-gray-400 text-center text-xs font-bold dark:border-gray-500 ${reached ? "bg-primary/8 text-primary" : "bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}
				>
					Level 5{reached && <HiCheck className="ml-1 inline h-3 w-3" />}
				</div>
				<div className="grid flex-1 grid-cols-2 divide-x divide-gray-300 dark:divide-gray-600">
					{lv5Profs.map((p) => (
						<ProfOption
							key={p.id}
							profId={p.id}
							skillName={skill.name}
							chosen={chosenProfessionIds.includes(p.id)}
							dimmed={false}
						/>
					))}
				</div>
			</div>
		);
	}

	if (levelNum === 10) {
		const chosenLv5 = lv5Profs.find((p) => chosenProfessionIds.includes(p.id));
		const lv10Sides = lv5Profs.map((lv5) => ({
			lv5,
			options: lv10Profs.filter((p) => p.parentProfession === lv5.id),
			isChosen: chosenLv5?.id === lv5.id,
		}));

		return (
			<div className="flex flex-col border-r border-gray-300 last:border-r-0 dark:border-gray-600">
				<div
					className={`flex h-8 items-center justify-center border-b border-gray-400 text-center text-xs font-bold dark:border-gray-500 ${reached ? "bg-primary/8 text-primary" : "bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}
				>
					Level 10{reached && <HiCheck className="ml-1 inline h-3 w-3" />}
				</div>
				<div className="grid flex-1 grid-cols-2 divide-x divide-gray-300 dark:divide-gray-600">
					{lv10Sides.map(({ lv5, options, isChosen }) => (
						<div key={lv5.id} className="flex flex-col">
							<div
								className={`flex h-6 items-center justify-center border-b border-gray-300 text-center text-[0.55rem] font-bold tracking-wide uppercase dark:border-gray-500 ${isChosen ? "text-primary" : "text-gray-500 dark:text-gray-400"}`}
							>
								If {lv5.name}
								{isChosen && <HiCheck className="ml-1 inline h-3 w-3" />}
							</div>
							<div className="flex flex-1 flex-col divide-y divide-gray-300 dark:divide-gray-600">
								{options.map((p) => (
									<ProfOption
										key={p.id}
										profId={p.id}
										skillName={skill.name}
										chosen={chosenProfessionIds.includes(p.id)}
										dimmed={!reached}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	const allRecipes = [
		...(levelData?.recipes?.crafting ?? []),
		...(levelData?.recipes?.cooking ?? []),
	];

	return (
		<div className="flex flex-col border-r border-gray-300 last:border-r-0 dark:border-gray-600">
			<div
				className={`flex h-8 items-center justify-center border-b border-gray-400 text-center text-xs font-bold dark:border-gray-500 ${reached ? "bg-primary/8 text-primary" : "bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}
			>
				Level {levelNum}
				{reached && <HiCheck className="ml-1 inline h-3 w-3" />}
			</div>
			<div className="flex min-h-30 flex-col gap-1.5 p-2">
				{allRecipes.length === 0 ? (
					<span className="flex flex-1 items-center justify-center text-[0.6rem] text-gray-400 dark:text-gray-500">
						—
					</span>
				) : (
					allRecipes.map((name) => (
						<RecipeItem key={name} name={name} reached={reached} />
					))
				)}
			</div>
		</div>
	);
}

export function SkillDetailModal({
	skill,
	currentLevel,
	chosenProfessionIds,
	isOpen,
	onClose,
}: Props) {
	const row1 = [1, 2, 3, 4, 5];
	const row2 = [6, 7, 8, 9, 10];

	return (
		<Modal show={isOpen} onClose={onClose} dismissible size="5xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(skill.image)}
						alt={skill.name}
						className="h-12 w-12 object-contain"
					/>
					<div>
						<div className="text-lg font-extrabold">{skill.name}</div>
						<div className="text-sm font-normal text-gray-500 dark:text-gray-400">
							{skill.toolBonus}
						</div>
					</div>
				</div>
			</ModalHeader>
			<ModalBody>
				<p className="mb-5 text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>

				{/* Levels 1–5 */}
				<div className="mb-1 text-[0.7rem] font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
					Levels 1 – 5
				</div>
				<div className="mb-4 overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
					<div className="grid grid-cols-5">
						{row1.map((lvl) => (
							<LevelBlock
								key={lvl}
								skill={skill}
								levelNum={lvl}
								reached={currentLevel >= lvl}
								chosenProfessionIds={chosenProfessionIds}
							/>
						))}
					</div>
				</div>

				{/* Levels 6–10 */}
				<div className="mb-1 text-[0.7rem] font-bold tracking-wide text-gray-500 uppercase dark:text-gray-400">
					Levels 6 – 10
				</div>
				<div className="overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
					<div className="grid grid-cols-5">
						{row2.map((lvl) => (
							<LevelBlock
								key={lvl}
								skill={skill}
								levelNum={lvl}
								reached={currentLevel >= lvl}
								chosenProfessionIds={chosenProfessionIds}
							/>
						))}
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
}
