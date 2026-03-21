import { Badge } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { MuseumBadgeProps as Props } from "@/types";

export function MuseumBadge({ donated, found }: Props) {
	if (donated) {
		return (
			<Badge color="success" icon={HiCheck} size="xxs">
				Donated
			</Badge>
		);
	}
	if (found) {
		return (
			<Badge color="warning" size="xxs">
				Found
			</Badge>
		);
	}
	return (
		<Badge color="gray" size="xxs">
			Not Found
		</Badge>
	);
}
