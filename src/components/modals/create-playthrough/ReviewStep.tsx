import type { SaveData } from "stardew-valley-data";
import type { BundleConfig, CharacterFormData, ReviewStepProps } from "@/types";
import { FARM_TYPE_LABELS } from "@/data/constants/farms";

function ReviewRow({ label, value }: { label: string; value: string | number }) {
	return (
		<div className="flex justify-between py-1">
			<span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
			<span className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</span>
		</div>
	);
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="rounded-lg border border-gray-200 p-3 dark:border-gray-600">
			<h4 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">{title}</h4>
			{children}
		</div>
	);
}

function UploadReview({ saveData }: { saveData: SaveData }) {
	return (
		<div className="space-y-3">
			<ReviewSection title="Character">
				<ReviewRow label="Name" value={saveData.player.name} />
				<ReviewRow label="Farm" value={`${saveData.player.farmName} Farm`} />
				<ReviewRow
					label="Farm Type"
					value={FARM_TYPE_LABELS[saveData.farm.type] ?? `Type ${saveData.farm.type}`}
				/>
				<ReviewRow label="Gender" value={saveData.player.gender} />
			</ReviewSection>

			<ReviewSection title="Progress">
				<ReviewRow
					label="Date"
					value={`${saveData.date.season} ${saveData.date.day}, Year ${saveData.date.year}`}
				/>
				<ReviewRow label="Money" value={`${saveData.player.money.toLocaleString()}g`} />
				<ReviewRow
					label="Total Earned"
					value={`${saveData.player.totalMoneyEarned.toLocaleString()}g`}
				/>
			</ReviewSection>

			<ReviewSection title="Skills">
				<ReviewRow
					label="Farming"
					value={`Level ${saveData.player.skills.farming.level}`}
				/>
				<ReviewRow
					label="Fishing"
					value={`Level ${saveData.player.skills.fishing.level}`}
				/>
				<ReviewRow
					label="Foraging"
					value={`Level ${saveData.player.skills.foraging.level}`}
				/>
				<ReviewRow label="Mining" value={`Level ${saveData.player.skills.mining.level}`} />
				<ReviewRow label="Combat" value={`Level ${saveData.player.skills.combat.level}`} />
			</ReviewSection>

			<ReviewSection title="Collections">
				<ReviewRow label="Fish Caught" value={saveData.fishCaught.length} />
				<ReviewRow label="Items Shipped" value={saveData.itemsShipped.length} />
				<ReviewRow label="Cooking Recipes" value={saveData.cookingRecipes.length} />
				<ReviewRow label="Crafting Recipes" value={saveData.craftingRecipes.length} />
				<ReviewRow label="Museum Donations" value={saveData.museum.donations.length} />
			</ReviewSection>

			<ReviewSection title="Bundles">
				<ReviewRow
					label="Path"
					value={saveData.bundles.isJojaRoute ? "Joja Warehouse" : "Community Center"}
				/>
				{!saveData.bundles.isJojaRoute && (
					<>
						<ReviewRow
							label="Rooms Complete"
							value={`${saveData.bundles.rooms.filter((r) => r.complete).length} / ${saveData.bundles.rooms.length}`}
						/>
						<ReviewRow
							label="CC Complete"
							value={saveData.bundles.isCCComplete ? "Yes" : "No"}
						/>
					</>
				)}
			</ReviewSection>
		</div>
	);
}

function BuildReview({
	characterForm,
	bundleConfig,
}: {
	characterForm: CharacterFormData;
	bundleConfig: BundleConfig;
}) {
	const activeBundleCount = bundleConfig.activeBundles.length;

	return (
		<div className="space-y-3">
			<ReviewSection title="Character">
				<ReviewRow label="Playthrough Name" value={characterForm.playthroughName} />
				<ReviewRow label="Farm Name" value={characterForm.farmName} />
				<ReviewRow
					label="Farm Type"
					value={FARM_TYPE_LABELS[characterForm.farmType] ?? "Standard"}
				/>
			</ReviewSection>

			<ReviewSection title="Bundles">
				<ReviewRow
					label="Path"
					value={
						bundleConfig.bundlePath === "joja" ? "Joja Warehouse" : "Community Center"
					}
				/>
				{bundleConfig.bundlePath === "cc" && (
					<>
						<ReviewRow
							label="Bundle Type"
							value={bundleConfig.isRemix ? "Remix" : "Standard"}
						/>
						<ReviewRow label="Active Bundles" value={activeBundleCount} />
					</>
				)}
			</ReviewSection>
		</div>
	);
}

export function ReviewStep({ path, saveData, characterForm, bundleConfig }: ReviewStepProps) {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
				Review Your Playthrough
			</h3>

			<div className="max-h-96 overflow-y-auto">
				{path === "upload" && saveData ? (
					<UploadReview saveData={saveData} />
				) : characterForm && bundleConfig ? (
					<BuildReview characterForm={characterForm} bundleConfig={bundleConfig} />
				) : null}
			</div>
		</div>
	);
}
