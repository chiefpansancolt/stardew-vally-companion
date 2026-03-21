import type { SaveData } from "stardew-valley-data";

export type WizardPath = "upload" | "build";

export type BundlePath = "joja" | "cc";

export interface CharacterFormData {
  playthroughName: string;
  farmName: string;
  farmType: number;
}

export interface BundleConfig {
  bundlePath: BundlePath | null;
  isRemix: boolean;
  activeBundles: string[];
  selectedBundles: Record<string, string[]>;
}

export interface ChoosePathStepProps {
  onSelect: (path: WizardPath) => void;
}

export interface CharacterInfoStepProps {
  formData: CharacterFormData;
  onChange: (data: CharacterFormData) => void;
}

export interface BundleSelectionStepProps {
  config: BundleConfig;
  onChange: (config: BundleConfig) => void;
}

export interface UploadSaveStepProps {
  description: string;
  onDescriptionChange: (value: string) => void;
  onParsed: (data: SaveData) => void;
  parsedData: SaveData | null;
}

export interface ReviewStepProps {
  path: "upload" | "build";
  saveData?: SaveData | null;
  description?: string;
  characterForm?: CharacterFormData;
  bundleConfig?: BundleConfig;
}

export interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}
