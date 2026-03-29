"use client";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import type { EditModalProps } from "@/types";
import { EditStepProgress } from "./EditStepProgress";

export function EditModal({ isOpen, onClose, title, steps, onSave }: EditModalProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [isSaving, setIsSaving] = useState(false);

	const isFirstStep = currentStep === 0;
	const isLastStep = currentStep === steps.length - 1;
	const showProgress = steps.length > 1;

	useEffect(() => {
		if (!isOpen) {
			setCurrentStep(0);
			setIsSaving(false);
		}
	}, [isOpen]);

	const handleBack = () => {
		if (isFirstStep) return;
		setCurrentStep((prev) => prev - 1);
	};

	const handleSave = async () => {
		setIsSaving(true);
		try {
			await onSave(currentStep);
			onClose();
		} finally {
			setIsSaving(false);
		}
	};

	const handleSaveAndContinue = async () => {
		setIsSaving(true);
		try {
			await onSave(currentStep);
			setCurrentStep((prev) => prev + 1);
		} finally {
			setIsSaving(false);
		}
	};

	const stepLabels = steps.map((s) => s.label);

	return (
		<Modal show={isOpen} onClose={onClose} dismissible size="5xl">
			<ModalHeader>{title}</ModalHeader>
			<ModalBody>{steps[currentStep]?.content}</ModalBody>
			<ModalFooter>
				<div className="flex w-full items-center justify-between gap-4">
					<div className="flex-none">
						<Button
							color="gray"
							onClick={handleBack}
							disabled={isFirstStep || isSaving}
						>
							<HiChevronLeft className="mr-1 h-4 w-4" />
							Back
						</Button>
					</div>

					<div className="flex flex-1 justify-center">
						{showProgress && (
							<EditStepProgress
								steps={stepLabels}
								currentStep={currentStep}
								onStepClick={setCurrentStep}
							/>
						)}
					</div>

					<div className="flex flex-none items-center gap-2">
						<Button color="accent" onClick={handleSave} disabled={isSaving}>
							{isSaving ? (
								<>
									<Spinner size="sm" className="mr-2" />
									Saving...
								</>
							) : (
								"Save"
							)}
						</Button>
						{!isLastStep && (
							<Button
								color="accent"
								onClick={handleSaveAndContinue}
								disabled={isSaving}
							>
								{isSaving ? (
									<>
										<Spinner size="sm" className="mr-2" />
										Saving...
									</>
								) : (
									"Save & Continue"
								)}
							</Button>
						)}
					</div>
				</div>
			</ModalFooter>
		</Modal>
	);
}
