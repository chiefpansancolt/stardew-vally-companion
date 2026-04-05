import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
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

const stardewValley = localFont({
	src: [
		{ path: "../../public/fonts/svthin.otf.woff2", weight: "400", style: "normal" },
		{ path: "../../public/fonts/svbold.otf.woff2", weight: "700", style: "normal" },
	],
	variable: "--font-stardew-valley",
	display: "swap",
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
		<html lang="en" className="h-full">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${stardewValley.variable} bg-surface dark:bg-surface-dark min-h-screen antialiased`}
			>
				<UIProvider>
					<PlaythroughProvider>
						<LayoutWrapper>{children}</LayoutWrapper>
					</PlaythroughProvider>
				</UIProvider>
				<Analytics />
			</body>
		</html>
	);
}
