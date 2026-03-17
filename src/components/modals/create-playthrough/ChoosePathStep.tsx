import { HiUpload } from "react-icons/hi";
import { HiWrenchScrewdriver } from "react-icons/hi2";

export type WizardPath = "upload" | "build";

interface ChoosePathStepProps {
	onSelect: (path: WizardPath) => void;
}

export function ChoosePathStep({ onSelect }: ChoosePathStepProps) {
	return (
		<div className="grid grid-cols-2 gap-4">
			<button
				type="button"
				onClick={() => onSelect("upload")}
				className="group hover:border-primary hover:bg-primary/5 dark:hover:border-primary dark:hover:bg-primary/10 flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-gray-200 p-6 transition-all dark:border-gray-600"
			>
				<HiUpload className="group-hover:text-primary h-12 w-12 text-gray-400 transition-colors" />
				<span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
					Upload Save File
				</span>
				<span className="text-center text-sm text-gray-500 dark:text-gray-400">
					Import progress from an existing Stardew Valley save
				</span>
			</button>

			<button
				type="button"
				onClick={() => onSelect("build")}
				className="group hover:border-primary hover:bg-primary/5 dark:hover:border-primary dark:hover:bg-primary/10 flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-gray-200 p-6 transition-all dark:border-gray-600"
			>
				<HiWrenchScrewdriver className="group-hover:text-primary h-12 w-12 text-gray-400 transition-colors" />
				<span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
					Build Starter
				</span>
				<span className="text-center text-sm text-gray-500 dark:text-gray-400">
					Manually set up a new playthrough from scratch
				</span>
			</button>
		</div>
	);
}
