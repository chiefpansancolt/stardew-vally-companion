"use client";

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import type { CalendarDayModalProps as Props } from "@/types";
import { assetPath } from "@/lib/utils/assetPath";
import { BOOKSELLER_ICON, SEASONS } from "@/data/constants/seasons";
import { NAVY_TILE } from "@/data/constants/styles";

export function CalendarDayModal({
	day,
	season,
	isBookseller,
	birthdays,
	festivals,
	onClose,
}: Props) {
	if (day === null || (birthdays.length === 0 && festivals.length === 0 && !isBookseller))
		return null;

	const seasonMeta = SEASONS[season];

	return (
		<Modal show onClose={onClose} dismissible size="lg">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={assetPath(seasonMeta.image)}
						alt={seasonMeta.label}
						className="h-8 w-8 object-contain"
					/>
					<span className="text-lg font-bold">
						{seasonMeta.label} {day}
					</span>
				</div>
			</ModalHeader>
			<ModalBody>
				<div className="flex flex-col gap-4">
					{birthdays.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Birthdays</div>
							<div className="flex flex-col gap-2">
								{birthdays.map((b) => (
									<div
										key={b.name}
										className="flex items-center gap-3 rounded-xl px-4 py-3"
										style={NAVY_TILE}
									>
										<img
											src={assetPath(b.image)}
											alt={b.name}
											className="h-10 w-10 shrink-0 rounded-lg object-contain"
										/>
										<span className="text-sm font-bold text-white">
											{b.name}&apos;s Birthday
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					{festivals.length > 0 && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Festivals</div>
							<div className="flex flex-col gap-2">
								{festivals.map((f) => (
									<div key={f.name} className="overflow-hidden rounded-xl">
										<div
											className="flex items-center gap-3 px-4 py-3"
											style={NAVY_TILE}
										>
											<img
												src={assetPath(f.calendarIcon)}
												alt={f.name}
												className="h-8 w-8 shrink-0 object-contain"
											/>
											<span className="text-sm font-bold text-white">
												{f.name}
											</span>
										</div>
										{f.image && (
											<img
												src={assetPath(f.image)}
												alt={f.name}
												className="w-full object-cover"
											/>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					{isBookseller && (
						<div>
							<div className="mb-2 text-sm font-bold text-gray-900">Bookseller</div>
							<div
								className="flex items-center gap-3 rounded-xl px-4 py-3"
								style={NAVY_TILE}
							>
								<img
									src={assetPath(BOOKSELLER_ICON)}
									alt="Bookseller"
									className="h-8 w-8 shrink-0 object-contain"
								/>
								<div>
									<span className="text-sm font-bold text-white">Bookseller</span>
									<div className="text-[0.65rem] text-white/50">
										Possible visit day — the Bookseller appears 2 random days
										per season
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</ModalBody>
		</Modal>
	);
}
