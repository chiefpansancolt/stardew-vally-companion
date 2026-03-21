import { Card } from "flowbite-react";
import { NoPlaythroughFallbackProps as Props } from "@/types";

export function NoPlaythroughFallback({ feature }: Props) {
	return (
		<div className="p-6">
			<Card className="py-16 text-center">
				<div className="mx-auto max-w-md">
					<h2 className="mb-2 text-xl font-semibold text-gray-700">
						No Active Playthrough
					</h2>
					<p className="text-gray-500">
						Select or create a playthrough to view {feature}.
					</p>
				</div>
			</Card>
		</div>
	);
}
