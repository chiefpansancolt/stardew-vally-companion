"use client";

import { Modal, ModalBody, ModalHeader, TabItem, Tabs } from "flowbite-react";
import { universalGifts, type Villager } from "stardew-valley-data";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiCheck, HiLockClosed } from "react-icons/hi";
import { type VillagerProgress } from "@/types/app/game";
import { assetPath } from "@/lib/utils/assetPath";
import { effectiveMaxHearts } from "@/lib/utils/villagerHearts";

interface HeartEvent {
	heart: number;
	id: number | number[] | null;
	description: string;
	details: string;
}

interface Props {
	villager: Villager;
	progress: VillagerProgress | undefined;
	spouse: string;
	onClose: () => void;
}

function isSeen(event: HeartEvent, eventsSeen: string[], hearts: number): boolean {
	// Non-visible events (null id, e.g. mail/gifts) — treated as received once the player reaches that heart level
	if (event.id === null) return hearts >= event.heart;
	return [event.id].flat().some((id) => eventsSeen.includes(String(id)));
}

function capitalize(s: string) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export function VillagerDetailModal({ villager, progress, spouse, onClose }: Props) {
	const universal = universalGifts();
	const hearts = progress?.hearts ?? 0;
	const eventsSeen = progress?.eventsSeen ?? [];
	const status = (progress?.status ?? "").toLowerCase();
	const isMarried = spouse === villager.name;
	const isRoommate = !isMarried && status === "roommate";

	const portraitSrc =
		isMarried && villager.spouseImage
			? assetPath(villager.spouseImage)
			: assetPath(villager.image);

	const maxHearts = effectiveMaxHearts(villager, isMarried, status);

	const heartEvents = villager.events as HeartEvent[];
	const countableEvents = heartEvents.filter((e) => e.id !== null);
	const seenCount = countableEvents.filter((e) => isSeen(e, eventsSeen, hearts)).length;
	const totalEvents = countableEvents.length;

	const eventsTabTitle =
		totalEvents > 0 ? `Heart Events (${seenCount}/${totalEvents})` : "Heart Events";

	return (
		<Modal show onClose={onClose} dismissible size="5xl">
			<ModalHeader>
				<div className="flex items-center gap-3">
					<img
						src={portraitSrc}
						alt={villager.name}
						className="h-16 w-16 rounded-lg object-contain"
					/>
					<div>
						<div className="flex items-center gap-2">
							<span className="text-lg font-bold text-gray-800">{villager.name}</span>
							{isMarried && (
								<span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[0.65rem] font-bold text-yellow-700">
									Married
								</span>
							)}
							{isRoommate && (
								<span className="rounded-full bg-orange-100 px-2 py-0.5 text-[0.65rem] font-bold text-orange-700">
									Roommate
								</span>
							)}
						</div>
						<div className="text-sm text-gray-500">
							{villager.occupation} · {villager.address}
						</div>
					</div>
				</div>
			</ModalHeader>

			<ModalBody>
				<div className="flex gap-5">
					{/* ── Left column ── */}
					<div className="flex w-56 shrink-0 flex-col gap-4">
						<img
							src={portraitSrc}
							alt={villager.name}
							className="aspect-square w-full rounded-xl object-contain"
						/>

						<div className="space-y-2.5">
							<div>
								<div className="text-[0.6rem] font-bold tracking-widest text-gray-400 uppercase">
									Birthday
								</div>
								<div className="text-sm font-semibold text-gray-700">
									{capitalize(villager.birthday.season)} {villager.birthday.day}
								</div>
							</div>
							<div>
								<div className="text-[0.6rem] font-bold tracking-widest text-gray-400 uppercase">
									Address
								</div>
								<div className="text-sm font-semibold text-gray-700">
									{villager.address}
								</div>
							</div>
							<div>
								<div className="text-[0.6rem] font-bold tracking-widest text-gray-400 uppercase">
									Occupation
								</div>
								<div className="text-sm font-semibold text-gray-700">
									{villager.occupation}
								</div>
							</div>

							{/* Heart meter */}
							<div>
								<div className="mb-1 text-sm font-bold text-gray-800">
									{hearts} / {maxHearts} hearts
								</div>
								<div className="flex flex-wrap gap-0.5">
									{Array.from({ length: maxHearts }).map((_, i) =>
										i < hearts ? (
											<FaHeart key={i} className="h-3 w-3 text-red-400" />
										) : (
											<FaRegHeart key={i} className="h-3 w-3 text-gray-400" />
										)
									)}
								</div>
								{progress !== undefined &&
									(() => {
										const heartPoints = progress.heartPoints ?? 0;
										const maxPoints = maxHearts * 250;
										const partial = heartPoints % 250;
										const pct = Math.round((partial / 250) * 100);
										const isMax = hearts >= maxHearts;
										return (
											<div className="mt-2 space-y-1">
												<div className="flex justify-between text-[0.65rem] font-semibold text-gray-500">
													<span>Friendship pts</span>
													<span className={isMax ? "text-green-600" : ""}>
														{heartPoints} / {maxPoints}
													</span>
												</div>
												{!isMax && (
													<>
														<div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
															<div
																className="h-full rounded-full bg-red-400"
																style={{ width: `${pct}%` }}
															/>
														</div>
														<div className="text-right text-[0.6rem] text-gray-500">
															{250 - partial} pts to next heart
														</div>
													</>
												)}
											</div>
										);
									})()}
							</div>
						</div>

						<p className="text-[0.7rem] leading-relaxed text-gray-500">
							{villager.description}
						</p>
					</div>

					{/* ── Right column ── */}
					<div className="min-w-0 flex-1">
						<Tabs variant="underline">
							<TabItem title={eventsTabTitle}>
								<div className="space-y-2">
									{heartEvents.length === 0 && (
										<p className="text-sm text-gray-400">
											No heart events for this villager.
										</p>
									)}
									{heartEvents.map((event, idx) => {
										const seen = isSeen(event, eventsSeen, hearts);
										const isNullEvent = event.id === null;
										return (
											<div
												key={idx}
												className={`rounded-lg border p-3 ${
													seen
														? "border-green-200 bg-green-50"
														: "border-gray-200 bg-white"
												}`}
											>
												<div className="flex items-start gap-3">
													<div
														className={`flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-lg text-xs font-bold ${
															seen
																? "bg-green-100 text-green-700"
																: "bg-red-50 text-red-400"
														}`}
													>
														<FaHeart className="h-3 w-3" />
														<span className="text-[0.6rem] leading-none">
															{event.heart}
														</span>
													</div>
													<div className="min-w-0 flex-1">
														<p className="text-sm leading-snug font-semibold text-gray-700">
															{event.description}
														</p>
														<p className="mt-0.5 text-[0.65rem] leading-snug text-gray-400">
															{event.details}
														</p>
														<div className="mt-1.5">
															{seen ? (
																<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[0.6rem] font-bold text-green-700">
																	<HiCheck className="h-3 w-3" />{" "}
																	{isNullEvent
																		? "Complete"
																		: "Seen"}
																</span>
															) : (
																<span className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-2 py-0.5 text-[0.6rem] font-bold text-gray-500">
																	<HiLockClosed className="h-3 w-3 text-red-400" />{" "}
																	{isNullEvent
																		? "Not Complete"
																		: "Not Seen"}
																</span>
															)}
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</TabItem>

							<TabItem title="Gift Preferences">
								<div className="space-y-4">
									{(villager.loves.length > 0 || universal.loves.length > 0) && (
										<div>
											<div className="mb-2 text-[0.7rem] font-bold tracking-wider text-gray-500 uppercase">
												Loved Gifts
											</div>
											<div className="flex flex-wrap gap-1.5">
												{villager.loves.map((gift) => (
													<span
														key={gift}
														className="rounded-md border border-orange-200 bg-orange-50 px-2 py-1 text-[0.7rem] font-semibold text-orange-700"
													>
														{gift}
													</span>
												))}
												{universal.loves.map((gift) => (
													<span
														key={`u-${gift}`}
														className="inline-flex items-center gap-1 rounded-md border border-orange-300 bg-orange-100 px-2 py-1 text-[0.7rem] font-semibold text-orange-700"
													>
														{gift}
														<span className="rounded bg-orange-300 px-1 text-[0.5rem] font-bold text-orange-900 uppercase">
															Uni
														</span>
													</span>
												))}
											</div>
										</div>
									)}
									{(villager.likes.length > 0 || universal.likes.length > 0) && (
										<div>
											<div className="mb-2 text-[0.7rem] font-bold tracking-wider text-gray-500 uppercase">
												Liked Gifts
											</div>
											<div className="flex flex-wrap gap-1.5">
												{villager.likes.map((gift) => (
													<span
														key={gift}
														className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[0.7rem] font-semibold text-gray-600"
													>
														{gift}
													</span>
												))}
												{universal.likes.map((gift) => (
													<span
														key={`u-${gift}`}
														className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-[0.7rem] font-semibold text-gray-600"
													>
														{gift}
														<span className="rounded bg-gray-300 px-1 text-[0.5rem] font-bold text-gray-700 uppercase">
															Uni
														</span>
													</span>
												))}
											</div>
										</div>
									)}
									{(villager.dislikes.length > 0 ||
										universal.dislikes.length > 0) && (
										<div>
											<div className="mb-2 text-[0.7rem] font-bold tracking-wider text-gray-500 uppercase">
												Disliked Gifts
											</div>
											<div className="flex flex-wrap gap-1.5">
												{villager.dislikes.map((gift) => (
													<span
														key={gift}
														className="rounded-md border border-slate-300 bg-slate-100 px-2 py-0.5 text-[0.65rem] font-medium text-slate-600"
													>
														{gift}
													</span>
												))}
												{universal.dislikes.map((gift) => (
													<span
														key={`u-${gift}`}
														className="inline-flex items-center gap-1 rounded-md border border-slate-400 bg-slate-200 px-2 py-0.5 text-[0.65rem] font-medium text-slate-700"
													>
														{gift}
														<span className="rounded bg-slate-400 px-1 text-[0.5rem] font-bold text-white uppercase">
															Uni
														</span>
													</span>
												))}
											</div>
										</div>
									)}
									{(villager.hates.length > 0 || universal.hates.length > 0) && (
										<div>
											<div className="mb-2 text-[0.7rem] font-bold tracking-wider text-gray-500 uppercase">
												Hated Gifts
											</div>
											<div className="flex flex-wrap gap-1.5">
												{villager.hates.map((gift) => (
													<span
														key={gift}
														className="rounded-md border border-red-100 bg-red-50 px-2 py-0.5 text-[0.65rem] font-medium text-red-500"
													>
														{gift}
													</span>
												))}
												{universal.hates.map((gift) => (
													<span
														key={`u-${gift}`}
														className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-100 px-2 py-0.5 text-[0.65rem] font-medium text-red-600"
													>
														{gift}
														<span className="rounded bg-red-300 px-1 text-[0.5rem] font-bold text-red-900 uppercase">
															Uni
														</span>
													</span>
												))}
											</div>
										</div>
									)}
								</div>
							</TabItem>
						</Tabs>
					</div>
				</div>
			</ModalBody>
		</Modal>
	);
}
