import { HiCheck } from "react-icons/hi";
import type { ItemTileProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

export function ItemTile({ item, complete }: ItemTileProps) {
	return (
		<div
			className={`relative flex flex-col items-center gap-1 rounded-md border p-1.5 transition-all ${
				complete ? "border-green-500/40 bg-green-900/20" : "border-white/10 bg-white/5"
			}`}
		>
			<div className="relative">
				<img
					src={assetPath(item.image)}
					alt={item.name}
					className={`h-9 w-9 object-contain ${complete ? "" : "opacity-25 grayscale"}`}
				/>
				{complete && (
					<div className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 shadow">
						<HiCheck className="h-2.5 w-2.5 text-white" />
					</div>
				)}
			</div>
			<span
				className={`w-full text-center text-[0.55rem] leading-tight font-semibold ${
					complete ? "text-green-300" : "text-white/50"
				}`}
				style={{ wordBreak: "break-word" }}
			>
				{item.name}
			</span>
		</div>
	);
}
