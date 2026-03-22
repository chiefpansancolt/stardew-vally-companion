import type { AnimalsTabProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { formatNumber } from "@/lib/utils/formatting";
import { NAVY_TILE } from "@/data/constants/styles";

export function AnimalsTab({ animals }: Props) {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{animals.map((a) => (
				<div key={a.id} className="rounded-lg p-3" style={NAVY_TILE}>
					<div className="mb-2 flex items-center gap-3">
						<img
							src={assetPath(a.image)}
							alt={a.name}
							className="h-12 w-12 shrink-0 object-contain"
						/>
						<div className="flex-1">
							<div className="text-sm font-bold text-white">{a.name}</div>
							<div className="text-[0.6rem] text-white/50">{a.description}</div>
						</div>
						<div className="text-right">
							<div className="text-highlight text-sm font-bold">
								{formatNumber(a.purchasePrice!)}g
							</div>
							<div className="text-[0.6rem] text-white/40">{a.building}</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						{a.produce && (
							<div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1">
								<img
									src={assetPath(a.produce.image)}
									alt={a.produce.name}
									className="h-5 w-5 object-contain"
								/>
								<span className="text-[0.6rem] text-white/70">
									{a.produce.name}
								</span>
							</div>
						)}
						{a.deluxeProduce && (
							<div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1">
								<img
									src={assetPath(a.deluxeProduce.image)}
									alt={a.deluxeProduce.name}
									className="h-5 w-5 object-contain"
								/>
								<span className="text-[0.6rem] text-white/70">
									{a.deluxeProduce.name}
								</span>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
