import { Badge } from "flowbite-react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { CookingBadgeProps as Props } from "@/types";

export function CookingBadge({ learned, cooked }: Props) {
	if (cooked) {
		return (
			<Badge color="success" icon={HiCheck} size="xxs">
				Cooked
			</Badge>
		);
	}
	if (learned) {
		return <Badge color="warning" size="xxs">Learned</Badge>;
	}
	return (
		<Badge color="gray" icon={HiLockClosed} size="xxs">
			Not Learned
		</Badge>
	);
}
