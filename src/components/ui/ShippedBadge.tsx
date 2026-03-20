import { Badge } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

interface Props {
	shippable: boolean;
	shipped: boolean;
	count?: number;
}

export function ShippedBadge({ shippable, shipped, count }: Props) {
	if (!shippable) return null;

	if (shipped) {
		return (
			<Badge color="success" icon={HiCheck} size="xxs">
				Shipped{count !== undefined ? ` ×${count}` : ""}
			</Badge>
		);
	}

	return <Badge color="gray" size="xxs">Not Shipped</Badge>;
}
