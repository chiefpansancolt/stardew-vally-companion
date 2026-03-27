"use client";

import { Alert } from "flowbite-react";
import Link from "next/link";
import { HiInformationCircle } from "react-icons/hi";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { CCHero } from "@/comps/community-center/CCHero";
import { RoomSections } from "@/comps/community-center/RoomSection";
import { NoPlaythroughFallback } from "@/comps/ui/NoPlaythroughFallback";
import { PageHeader } from "@/comps/ui/PageHeader";

export default function CommunityCenterPage() {
	const { activePlaythrough } = usePlaythrough();

	if (!activePlaythrough) {
		return <NoPlaythroughFallback feature="community center" />;
	}

	if (activePlaythrough.data.joja?.isMember) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center p-6">
				<div className="text-center">
					<div className="text-lg font-bold text-gray-500">Joja Member</div>
					<p className="mt-2 text-sm text-gray-600">You chose the Joja route.</p>
					<Link
						href="/joja"
						className="bg-primary hover:bg-primary/80 mt-4 inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white"
					>
						Go to Joja Development
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6">
			<PageHeader title="Community Center" description="Bundle progress and room completion" />

			<div className="flex flex-col gap-6">
				{activePlaythrough.data.communityCenter.completed && (
					<Alert color="info" icon={HiInformationCircle}>
						When the Community Center is fully completed, the save file no longer tracks
						which specific items were placed in each bundle slot. Item completion shown
						below may not reflect what was originally contributed.
					</Alert>
				)}
				<CCHero gameData={activePlaythrough.data} />
				<RoomSections gameData={activePlaythrough.data} />
			</div>
		</div>
	);
}
