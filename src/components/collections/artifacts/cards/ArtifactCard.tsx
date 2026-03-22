import type { ArtifactCardProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { museumCardStyles } from "@/lib/utils/cardStyles";
import { PriceGrid } from "@/comps/ui/price-grid";
import { StatusBadge } from "@/comps/ui/StatusBadge";

export function ArtifactCard({ artifact, donated, found, onClick }: ArtifactCardProps) {
	const { borderBg, nameColor } = museumCardStyles(donated, found);

	return (
		<button
			onClick={onClick}
			className={`flex w-full cursor-pointer flex-col gap-2 rounded-xl border p-3 text-left transition-all ${borderBg}`}
		>
			<div className="flex items-start gap-2.5">
				<img
					src={assetPath(artifact.image)}
					alt={artifact.name}
					className="h-12 w-12 shrink-0 rounded-lg object-contain"
				/>
				<div className="min-w-0 flex-1">
					<span className={`text-sm leading-tight font-bold ${nameColor}`}>
						{artifact.name}
					</span>
					<div className="mt-0.5 text-[0.6rem] text-white/40">Click to see locations</div>
				</div>
				{donated ? (
					<StatusBadge status="success" label="Donated" />
				) : found ? (
					<StatusBadge status="warning" label="Found" />
				) : (
					<StatusBadge status="inactive" label="Not Found" />
				)}
			</div>

			<PriceGrid price={artifact.sellPrice} maxQuality="normal" shipped={donated} />

			{artifact.donationNotes && (
				<div className="border-highlight/30 bg-highlight/15 text-highlight inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.6rem] font-bold">
					★ Reward
				</div>
			)}
		</button>
	);
}
