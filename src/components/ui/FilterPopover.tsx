"use client";

import { useRef, useEffect, useState } from "react";
import { HiAdjustments } from "react-icons/hi";

interface FilterPopoverProps {
	activeCount: number;
	children: React.ReactNode;
}

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

interface FilterGroupProps {
	label: string;
	className?: string;
	children: React.ReactNode;
}

export function FilterGroup({ label, className = "", children }: FilterGroupProps) {
	return (
		<div className={className}>
			<div className="mb-2 text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
				{label}
			</div>
			<div className="flex flex-wrap gap-1.5">{children}</div>
		</div>
	);
}

interface FilterSelectProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: { value: string; label: string }[];
}

export function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
	return (
		<div>
			<div className="mb-2 text-[0.6rem] font-semibold tracking-wide text-white/80 uppercase">
				{label}
			</div>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full cursor-pointer rounded-md border border-white/20 bg-white/5 px-2.5 py-1.5 text-[0.7rem] font-semibold text-white/80 outline-none focus:border-accent"
			>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value} className="bg-surface-dark text-white">
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}

interface FilterRadioProps {
	name: string;
	value: string;
	checked: boolean;
	onChange: () => void;
	children: React.ReactNode;
}

export function FilterRadio({ name, value, checked, onChange, children }: FilterRadioProps) {
	return (
		<label
			className={`relative flex cursor-pointer items-center rounded-md border px-2.5 py-1 transition-all ${
				checked
					? "border-accent bg-accent text-white"
					: "border-white/20 bg-white/5 text-white/60 hover:border-white/40"
			}`}
		>
			<input
				type="radio"
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
				className="absolute inset-0 cursor-pointer appearance-none"
			/>
			<span className="text-[0.7rem] font-semibold">{children}</span>
		</label>
	);
}
