import { Label, Select, TextInput } from "flowbite-react";

const FARM_TYPES = [
	{ value: 0, label: "Standard" },
	{ value: 1, label: "Riverland" },
	{ value: 2, label: "Forest" },
	{ value: 3, label: "Hill-top" },
	{ value: 4, label: "Wilderness" },
	{ value: 5, label: "Four Corners" },
	{ value: 6, label: "Beach" },
	{ value: 7, label: "Meadowlands" },
];

export interface CharacterFormData {
	playthroughName: string;
	farmName: string;
	farmType: number;
}

interface CharacterInfoStepProps {
	formData: CharacterFormData;
	onChange: (data: CharacterFormData) => void;
}

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
