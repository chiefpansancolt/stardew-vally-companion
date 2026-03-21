import { HiCheck } from "react-icons/hi";
import type { StepIndicatorProps } from "@/types";

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
	return (
		<div className="mb-8 flex w-full items-start">
			{steps.map((label, index) => {
				const stepNum = index + 1;
				const isCompleted = stepNum < currentStep;
				const isCurrent = stepNum === currentStep;

				return (
					<div
						key={label}
						className={`flex items-center ${index < steps.length - 1 ? "w-full" : ""}`}
					>
						<div className="relative flex flex-col items-center">
							<span
								className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
									isCompleted
										? "bg-primary text-white"
										: isCurrent
											? "bg-primary/20 text-primary ring-primary ring-2"
											: "border-2 border-gray-300 bg-gray-100 text-gray-500 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400"
								}`}
							>
								{isCompleted ? <HiCheck className="h-4 w-4" /> : stepNum}
							</span>
							<span
								className={`absolute top-full mt-1 text-xs whitespace-nowrap ${
									isCurrent
										? "text-primary font-semibold"
										: "text-gray-500 dark:text-gray-400"
								}`}
							>
								{label}
							</span>
						</div>
						{index < steps.length - 1 && (
							<div
								className={`mx-2 h-0.5 w-full min-w-8 ${
									isCompleted ? "bg-primary" : "bg-gray-300 dark:bg-gray-500"
								}`}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
