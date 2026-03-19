"use client";

import {
	Sidebar,
	SidebarCollapse,
	SidebarItem,
	SidebarItemGroup,
	SidebarItems,
} from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiCog, HiCollection, HiHome, HiTable, HiUser, HiUserGroup, HiViewGrid } from "react-icons/hi";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useUI } from "@/lib/contexts/UIContext";
import { PlaythroughSwitcher } from "./PlaythroughSwitcher";

export function AppSidebar() {
	const pathname = usePathname();
	const { activePlaythrough } = usePlaythrough();
	const { sidebarOpen, setSidebarOpen } = useUI();

	return (
		<aside
			className={`border-secondary/30 bg-secondary dark:border-secondary/40 dark:bg-secondary/90 fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 transform overflow-y-auto border-r transition-transform duration-300 ease-in-out md:static md:top-0 md:h-auto md:translate-x-0 ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}
		>
			<Sidebar aria-label="Sidebar navigation" className="h-full border-none">
				<div className="flex h-full flex-col">
					<PlaythroughSwitcher />

					<div className="mt-2 flex-1 overflow-y-auto">
						<SidebarItems>
							<SidebarItemGroup>
								<SidebarItem
									as={Link}
									href="/"
									icon={HiHome}
									active={pathname === "/"}
									onClick={() => setSidebarOpen(false)}
								>
									Home
								</SidebarItem>

								<SidebarItem
									as={Link}
									href="/playthrough/list"
									icon={HiViewGrid}
									active={pathname === "/playthrough/list"}
									onClick={() => setSidebarOpen(false)}
								>
									Playthroughs
								</SidebarItem>

								{activePlaythrough && (
									<SidebarItem
										as={Link}
										href="/character"
										icon={HiUser}
										active={pathname === "/character"}
										onClick={() => setSidebarOpen(false)}
									>
										Character
									</SidebarItem>
								)}

								{activePlaythrough && (
									<SidebarItem
										as={Link}
										href="/villagers"
										icon={HiUserGroup}
										active={pathname === "/villagers"}
										onClick={() => setSidebarOpen(false)}
									>
										Villagers
									</SidebarItem>
								)}

								{activePlaythrough && (
									<SidebarCollapse
										icon={HiCollection}
										label="Collections"
										open={pathname.startsWith("/collections")}
									>
										<SidebarItem
											as={Link}
											href="/collections"
											icon={HiTable}
											active={pathname === "/collections"}
											onClick={() => setSidebarOpen(false)}
										>
											Overview
										</SidebarItem>
									</SidebarCollapse>
								)}
							</SidebarItemGroup>
						</SidebarItems>
					</div>

					<div>
						<ul>
							<li>
								<Link
									href="/settings"
									onClick={() => setSidebarOpen(false)}
									className={`hover:bg-primary/30 dark:hover:bg-primary/30 flex cursor-pointer items-center justify-center rounded-lg p-2 text-sm font-normal text-white dark:text-white ${pathname === "/settings" ? "bg-primary/25 dark:bg-primary/35" : ""}`}
								>
									<HiCog className="h-6 w-6 shrink-0 text-white/80 transition duration-75" />
									<span className="flex-1 px-3 whitespace-nowrap">Settings</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</Sidebar>
		</aside>
	);
}
