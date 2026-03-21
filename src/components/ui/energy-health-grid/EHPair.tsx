import type { EHPairProps } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";

export function EHPair({ energy, health, iconSize, textSize }: EHPairProps) {
	return (
		<div className="flex items-center gap-1.5">
			<span className="inline-flex items-center gap-0.5">
				<img
					src={assetPath("images/misc/Energy.png")}
					alt="Energy"
					className={`${iconSize} object-contain`}
				/>
				<span className={`${textSize} font-bold text-yellow-300`}>+{energy}</span>
			</span>
			<span className="inline-flex items-center gap-0.5">
				<img
					src={assetPath("images/misc/Health.png")}
					alt="Health"
					className={`${iconSize} object-contain`}
				/>
				<span className={`${textSize} font-bold text-red-400`}>+{health}</span>
			</span>
		</div>
	);
}
