import { Tooltip } from "flowbite-react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import type { WalnutCardProps as Props } from "@/types";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function WalnutCard({ walnut, found }: Props) {
	return (
		<div
			className={`flex flex-col gap-1.5 rounded-lg border p-3 ${
				found ? "border-green-400/30 bg-green-400/10" : "border-white/10 bg-white/5"
			}`}
		>
			<div className="flex items-center justify-between gap-2">
				<span
					className={`text-[0.8rem] font-semibold ${found ? "text-green-300" : "text-white/80"}`}
				>
					{walnut.name}
				</span>
				<StatusBadge
					status={found ? "success" : "inactive"}
					label={found ? "Found" : "Not Found"}
				/>
			</div>
			<div className="flex items-center gap-2">
				<span className="rounded-full border border-white/12 bg-white/8 px-2 py-0.5 text-[0.5rem] font-semibold text-white/80">
					{walnut.location}
				</span>
				<Tooltip content={walnut.hint} placement="right" style="dark">
					<span className="flex cursor-pointer items-center gap-1 text-[0.6rem] font-semibold text-white/50 hover:text-white/80">
						<HiQuestionMarkCircle className="h-3.5 w-3.5" />
						Show Hint
					</span>
				</Tooltip>
			</div>
		</div>
	);
}
