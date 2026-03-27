"use client";

import { Tooltip } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import type { EditStepProgressProps } from "@/types";

export function EditStepProgress({ steps, currentStep, onStepClick }: EditStepProgressProps) {
	return (
		<div className="flex items-center justify-center">
			{steps.map((label, index) => {
				const isCompleted = index < currentStep;
				const isCurrent = index === currentStep;
				const isLast = index === steps.length - 1;

				return (
					<div key={label} className="flex items-center">
						<Tooltip content={label} placement="top">
							<button
								type="button"
								aria-label={label}
								onClick={() => onStepClick(index)}
								className={`relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none ${
									isCompleted
										? "bg-primary hover:opacity-80"
										: isCurrent
											? "border-2 border-primary bg-white"
											: "border-2 border-gray-300 bg-white hover:border-gray-400"
								}`}
							>
								{isCompleted && <HiCheck className="h-4 w-4 text-white" />}
								{isCurrent && (
									<span className="bg-primary h-2.5 w-2.5 rounded-full" />
								)}
							</button>
						</Tooltip>
						{!isLast && (
							<div
								className={`h-0.5 w-8 ${isCompleted ? "bg-primary" : "bg-gray-300"}`}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
