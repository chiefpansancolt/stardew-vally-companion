import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PlaythroughProvider } from "@/lib/contexts/PlaythroughContext";
import { UIProvider } from "@/lib/contexts/UIContext";
import { LayoutWrapper } from "@/comps/layout/LayoutWrapper";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Stardew Valley Companion",
	description:
		"Track your Stardew Valley progress — bundles, friendships, fishing, cooking, crafting, and more.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="h-full">
			<head>
				<ThemeModeScript />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-surface antialiased dark:bg-surface-dark`}
			>
				<UIProvider>
					<PlaythroughProvider>
						<LayoutWrapper>{children}</LayoutWrapper>
					</PlaythroughProvider>
				</UIProvider>
			</body>
		</html>
	);
}
