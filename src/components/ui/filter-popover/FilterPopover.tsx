"use client";

import { useEffect, useRef, useState } from "react";
import { HiAdjustments } from "react-icons/hi";
import type { FilterPopoverProps } from "@/types";

export function FilterPopover({ activeCount, children }: FilterPopoverProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	return (
		<div className="relative" ref={ref}>
			<button
				onClick={() => setOpen((o) => !o)}
				className="relative flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/15"
			>
				<HiAdjustments className="h-4 w-4" />
				Filters
				{activeCount > 0 && (
					<span className="bg-accent absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[0.6rem] font-bold text-white">
						{activeCount}
					</span>
				)}
			</button>
			{open && (
				<div
					className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-white/10 p-4 shadow-xl"
					style={{ background: "linear-gradient(135deg, #1e2538 0%, #2b3a67 100%)" }}
				>
					{children}
				</div>
			)}
		</div>
	);
}
