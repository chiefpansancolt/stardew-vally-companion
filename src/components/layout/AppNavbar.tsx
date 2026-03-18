"use client";

import { Button, Navbar, NavbarBrand } from "flowbite-react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { useUI } from "@/lib/contexts/UIContext";

export function AppNavbar() {
	const { sidebarOpen, toggleSidebar } = useUI();

	return (
		<Navbar
			fluid
			className="border-primary/30 bg-primary dark:border-primary/50 dark:bg-primary/90 border-b text-white"
		>
			<div className="flex items-center gap-3">
				<Button
					onClick={toggleSidebar}
					size="sm"
					className="mr-4 border-white/30 bg-white/15 text-white hover:bg-white/25 md:hidden"
				>
					{sidebarOpen ? <HiX className="size-6" /> : <HiMenu className="size-6" />}
					<span className="sr-only">Toggle sidebar</span>
				</Button>
				<NavbarBrand className="flex items-center gap-2">
					<Image
						src="/gamerdex-icon.svg"
						alt="GamerDex"
						width={32}
						height={32}
						className="h-8 w-8 shrink-0"
					/>
					<span
						className="self-center text-xl font-bold whitespace-nowrap text-white"
						style={{ fontFamily: "var(--font-stardew-valley)" }}
					>
						Stardew Valley Companion
					</span>
				</NavbarBrand>
			</div>
			<div className="flex md:order-2" />
		</Navbar>
	);
}
