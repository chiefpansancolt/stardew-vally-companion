"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { JojaHero } from "@/comps/joja/JojaHero";
import { DevelopmentsSection } from "@/comps/joja/DevelopmentsSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { NAVY_TILE } from "@/data/constants/styles";
import { assetPath } from "@/lib/utils/assetPath";

function JojaContent() {
	const { activePlaythrough } = usePlaythrough();
	const searchParams = useSearchParams();
	const devOverride = searchParams.get("dev") === "true";

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="joja development" />;
	}

	if (!devOverride && !activePlaythrough.data.joja?.isMember) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center p-6">
				<div className="text-center">
					<div className="text-lg font-bold text-gray-500">Not a Joja Member</div>
					<p className="mt-2 text-sm text-gray-600">
						You chose the Community Center route.
					</p>
					<Link
						href="/community-center"
						className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/80"
					>
						Go to Community Center
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-900">Joja Community Development</h1>
				<p className="mt-1 text-gray-600">
					Joja Mart community development projects
				</p>
			</div>

			<div className="flex flex-col gap-6">
				<div className="flex items-center gap-4 rounded-lg p-4" style={NAVY_TILE}>
					<img
						src={assetPath("images/shop/Joja Development Form.png")}
						alt="Joja Membership"
						className="h-12 w-12 shrink-0 object-contain"
					/>
					<div className="flex-1">
						<div className="text-sm font-bold text-white">Joja Membership</div>
						<div className="text-[0.7rem] text-white/80">
							Active member — community development projects available
						</div>
					</div>
					<span className={`text-sm font-bold ${activePlaythrough.data.joja?.isMember ? "text-green-400" : "text-white/80"}`}>
						{activePlaythrough.data.joja?.isMember ? "Active" : "Inactive"}
					</span>
				</div>

				<JojaHero gameData={activePlaythrough.data} />
				<DevelopmentsSection gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}

export default function JojaPage() {
	return (
		<Suspense>
			<JojaContent />
		</Suspense>
	);
}
