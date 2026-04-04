import type { PetCardProps as Props } from "@/types";
import { findPetImage } from "@/lib/pages/animals";
import { MAX_FRIENDSHIP } from "@/data/constants/animals";

export function PetCard({ pet }: Props) {
	const hasFriendship = pet.friendship !== null;
	const friendship = pet.friendship ?? 0;
	const pct = hasFriendship ? Math.min((friendship / MAX_FRIENDSHIP) * 100, 100) : 0;
	const isMaxed = hasFriendship && friendship >= MAX_FRIENDSHIP;
	const image = findPetImage(pet.type, pet.breed);

	return (
		<div
			className={`flex items-center gap-4 rounded-lg border p-4 ${
				isMaxed ? "border-green-400/30 bg-green-400/10" : "border-white/10 bg-white/5"
			}`}
		>
			{image && (
				<img src={image} alt={pet.type} className="h-14 w-14 shrink-0 object-contain" />
			)}
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<div className={`text-base font-bold ${isMaxed ? "text-green-300" : "text-white"}`}>
						{pet.name}
					</div>
					{pet.starter && (
						<span className="rounded bg-accent/20 px-1.5 py-0.5 text-[0.55rem] font-semibold text-accent">
							Starter
						</span>
					)}
				</div>
				<div className="mt-0.5 text-xs text-white/50">{pet.type}</div>
				{hasFriendship && (
					<>
						<div className="mt-1 flex items-center gap-2">
							<span className="text-[0.65rem] text-white/40">Friendship:</span>
							<span
								className={`text-xs font-bold ${isMaxed ? "text-green-400" : "text-white/80"}`}
							>
								{friendship} / {MAX_FRIENDSHIP}
							</span>
						</div>
						<div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
							<div
								className={`h-full rounded-full ${isMaxed ? "bg-green-400" : "bg-accent"}`}
								style={{ width: `${pct}%` }}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
