import { Badge } from "flowbite-react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { CraftingBadgeProps as Props } from "@/types";

export function CraftingBadge({ learned, crafted }: Props) {
	if (crafted) {
		return (
			<Badge color="success" icon={HiCheck} size="xxs">
				Crafted
			</Badge>
		);
	}
	if (learned) {
		return (
			<Badge color="warning" size="xxs">
				Learned
			</Badge>
		);
	}
	return (
		<Badge color="gray" icon={HiLockClosed} size="xxs">
			Not Learned
		</Badge>
	);
}
