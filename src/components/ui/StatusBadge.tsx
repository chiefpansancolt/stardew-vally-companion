import { Badge } from "flowbite-react";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import type { StatusBadgeProps as Props } from "@/types";

const STATUS_CONFIG = {
	success: { color: "success" as const, icon: HiCheck },
	warning: { color: "warning" as const, icon: undefined },
	inactive: { color: "failure" as const, icon: HiLockClosed },
};

export function StatusBadge({ status, label, count }: Props) {
	const config = STATUS_CONFIG[status];

	return (
		<Badge color={config.color} icon={config.icon} size="xxs">
			{label}
			{count !== undefined ? ` ×${count}` : ""}
		</Badge>
	);
}
