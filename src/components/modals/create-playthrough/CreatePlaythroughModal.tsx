"use client";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "flowbite-react";
import type { SaveData } from "stardew-valley-data";
import { useMemo, useState } from "react";
import type {
	BundleConfig,
	CharacterFormData,
	CreatePlaythroughModalProps,
	GameData,
	WizardPath,
} from "@/types";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { mapSaveDataToGameData } from "@/lib/utils/saveFileMapper";
import { DEFAULT_GAME_DATA } from "@/data/constants";
import { BundleSelectionStep } from "./BundleSelectionStep";
import { CharacterInfoStep } from "./CharacterInfoStep";
import { ChoosePathStep } from "./ChoosePathStep";
import { ReviewStep } from "./ReviewStep";
import { StepIndicator } from "./StepIndicator";
import { UploadSaveStep } from "./UploadSaveStep";

const UPLOAD_STEPS = ["Choose Path", "Upload File", "Review"];
const BUILD_STEPS = ["Choose Path", "Character", "Bundles", "Review"];

export function CreatePlaythroughModal({ isOpen, onClose }: CreatePlaythroughModalProps) {
	const { addPlaythrough } = usePlaythrough();
	const [currentStep, setCurrentStep] = useState(1);
	const [path, setPath] = useState<WizardPath | null>(null);
	const [saveData, setSaveData] = useState<SaveData | null>(null);
	const [uploadDescription, setUploadDescription] = useState("");
	const [characterForm, setCharacterForm] = useState<CharacterFormData>({
		playthroughName: "",
		farmName: "",
		farmType: 0,
		platform: "PC",
	});
	const [bundleConfig, setBundleConfig] = useState<BundleConfig>({
		bundlePath: null,
		isRemix: false,
		activeBundles: [],
		selectedBundles: {},
	});
	const [isSaving, setIsSaving] = useState(false);

	const steps = useMemo(() => {
		if (path === "upload") return UPLOAD_STEPS;
		if (path === "build") return BUILD_STEPS;
		return ["Choose Path"];
	}, [path]);

	const handleClose = () => {
		setCurrentStep(1);
		setPath(null);
		setSaveData(null);
		setUploadDescription("");
		setCharacterForm({ playthroughName: "", farmName: "", farmType: 0, platform: "PC" });
		setBundleConfig({
			bundlePath: null,
			isRemix: false,
			activeBundles: [],
			selectedBundles: {},
		});
		setIsSaving(false);
		onClose();
	};

	const handlePathSelect = (selected: WizardPath) => {
		setPath(selected);
		setCurrentStep(2);
	};

	const handleBack = () => {
		if (currentStep === 1) return;

		if (currentStep === 2) {
			setPath(null);
			setCurrentStep(1);
			return;
		}

		if (path === "build" && currentStep === 3 && bundleConfig.bundlePath === null) {
			setCurrentStep(2);
			return;
		}

		setCurrentStep(currentStep - 1);
	};

	const handleNext = () => {
		setCurrentStep(currentStep + 1);
	};

	const handleSave = () => {
		setIsSaving(true);

		try {
			if (path === "upload" && saveData) {
				const gameData = mapSaveDataToGameData(saveData);
				addPlaythrough({
					name: `${saveData.player.farmName} Farm`,
					description: uploadDescription.trim() || undefined,
					platform: "PC",
					data: gameData,
				});
			} else if (path === "build" && characterForm) {
				const bundles: Record<string, Record<string, boolean>> = {};
				for (const [bundleId, items] of Object.entries(bundleConfig.selectedBundles)) {
					bundles[bundleId] = Object.fromEntries(items.map((idx) => [idx, true]));
				}
				const gameData: GameData = {
					...DEFAULT_GAME_DATA,
					character: {
						...DEFAULT_GAME_DATA.character,
						farmName: characterForm.farmName,
						farmType: characterForm.farmType,
					},
					bundles,
				};
				addPlaythrough({
					name: characterForm.playthroughName,
					platform: characterForm.platform,
					data: gameData,
				});
			}

			handleClose();
		} finally {
			setIsSaving(false);
		}
	};

	const isLastStep =
		(path === "upload" && currentStep === 3) || (path === "build" && currentStep === 4);

	const canGoNext = (() => {
		if (path === "upload" && currentStep === 2) return !!saveData;
		if (path === "build" && currentStep === 2)
			return !!(characterForm.playthroughName.trim() && characterForm.farmName.trim());
		if (path === "build" && currentStep === 3)
			return (
				bundleConfig.bundlePath === "joja" ||
				(bundleConfig.bundlePath !== null && bundleConfig.activeBundles.length > 0)
			);
		return false;
	})();

	const renderStep = () => {
		if (currentStep === 1) {
			return <ChoosePathStep onSelect={handlePathSelect} />;
		}

		if (path === "upload") {
			if (currentStep === 2) {
				return (
					<UploadSaveStep
						description={uploadDescription}
						onDescriptionChange={setUploadDescription}
						onParsed={(data) => setSaveData(data)}
						parsedData={saveData}
					/>
				);
			}
			if (currentStep === 3) {
				return (
					<ReviewStep path="upload" saveData={saveData} description={uploadDescription} />
				);
			}
		}

		if (path === "build") {
			if (currentStep === 2) {
				return <CharacterInfoStep formData={characterForm} onChange={setCharacterForm} />;
			}
			if (currentStep === 3) {
				return <BundleSelectionStep config={bundleConfig} onChange={setBundleConfig} />;
			}
			if (currentStep === 4) {
				return (
					<ReviewStep
						path="build"
						characterForm={characterForm}
						bundleConfig={bundleConfig}
					/>
				);
			}
		}

		return null;
	};

	const showFooter = currentStep > 1;

	return (
		<Modal show={isOpen} onClose={handleClose} dismissible size="xl">
			<ModalHeader>
				<span style={{ fontFamily: "var(--font-stardew-valley)" }}>
					Create New Playthrough
				</span>
			</ModalHeader>
			<ModalBody>
				<div className="space-y-6">
					<StepIndicator steps={steps} currentStep={currentStep} />
					<div className="overflow-x-hidden">
						<hr className="-mx-7 border-gray-200 dark:border-gray-600" />
					</div>
					{renderStep()}
				</div>
			</ModalBody>
			{showFooter && (
				<ModalFooter>
					<div className="flex w-full justify-between">
						<Button onClick={handleBack} disabled={isSaving}>
							Back
						</Button>
						{isLastStep ? (
							<Button color="accent" onClick={handleSave} disabled={isSaving}>
								{isSaving ? (
									<>
										<Spinner size="sm" className="mr-2" />
										Saving...
									</>
								) : (
									"Save Playthrough"
								)}
							</Button>
						) : (
							<Button color="accent" onClick={handleNext} disabled={!canGoNext}>
								Next
							</Button>
						)}
					</div>
				</ModalFooter>
			)}
		</Modal>
	);
}
