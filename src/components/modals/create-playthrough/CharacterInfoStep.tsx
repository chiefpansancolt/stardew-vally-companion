import { Label, Select, TextInput } from "flowbite-react";
import type { CharacterInfoStepProps } from "@/types";
import { FARM_TYPES } from "@/data/constants/farms";

export function CharacterInfoStep({ formData, onChange }: CharacterInfoStepProps) {
	return (
		<div className="space-y-4">
			<div>
				<div className="mb-2 block">
					<Label htmlFor="playthrough-name">
						Playthrough Name <span className="text-red-600 dark:text-red-400">*</span>
					</Label>
				</div>
				<TextInput
					id="playthrough-name"
					placeholder="e.g., My First Run"
					value={formData.playthroughName}
					onChange={(e) => onChange({ ...formData, playthroughName: e.target.value })}
					required
				/>
			</div>

			<div>
				<div className="mb-2 block">
					<Label htmlFor="farm-name">
						Farm Name <span className="text-red-600 dark:text-red-400">*</span>
					</Label>
				</div>
				<TextInput
					id="farm-name"
					placeholder="e.g., Sunrise Farm"
					value={formData.farmName}
					onChange={(e) => onChange({ ...formData, farmName: e.target.value })}
					required
				/>
			</div>

			<div>
				<div className="mb-2 block">
					<Label htmlFor="farm-type">Farm Type</Label>
				</div>
				<Select
					id="farm-type"
					value={formData.farmType}
					onChange={(e) => onChange({ ...formData, farmType: Number(e.target.value) })}
				>
					{FARM_TYPES.map((ft) => (
						<option key={ft.value} value={ft.value}>
							{ft.label}
						</option>
					))}
				</Select>
			</div>
		</div>
	);
}
