import { Badge } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { ShippedBadgeProps as Props } from "@/types";

export function ShippedBadge({
	shippable,
	shipped,
	count,
	label = "Shipped",
	notLabel = "Not Shipped",
}: Props) {
	if (!shippable) return null;

	if (shipped) {
		return (
			<Badge color="success" icon={HiCheck} size="xxs">
				{label}
				{count !== undefined ? ` ×${count}` : ""}
			</Badge>
		);
	}

	return (
		<Badge color="gray" size="xxs">
			{notLabel}
		</Badge>
	);
}
