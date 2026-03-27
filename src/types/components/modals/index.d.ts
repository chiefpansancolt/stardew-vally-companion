import type { ReactNode } from "react";
import { Playthrough } from "@/types/app";

export interface CreatePlaythroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface EditPlaythroughModalProps {
  isOpen: boolean;
  currentPlaythrough: Playthrough;
  onClose: () => void;
}

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
}

export interface EditStepProgressProps {
  steps: string[];
  currentStep: number;
}

export interface EditStep {
  label: string;
  content: ReactNode;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  steps: EditStep[];
  onSave: (stepIndex: number) => void | Promise<void>;
}
