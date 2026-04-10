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

const siteUrl = "https://stardew-valley.gamerdex.app";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Stardew Valley Companion",
		template: "%s | Stardew Valley Companion",
	},
	description:
		"A free progress tracker for Stardew Valley. Track bundles, friendships, fish, crops, minerals, artifacts, skills, and more across multiple playthroughs.",
	keywords: [
		"Stardew Valley",
		"Stardew Valley tracker",
		"Stardew Valley companion",
		"Stardew Valley progress",
		"community center tracker",
		"Stardew Valley bundles",
		"Stardew Valley fishing",
		"Stardew Valley perfection",
		"farm tracker",
	],
	authors: [{ name: "GamerDex" }],
	creator: "GamerDex",
	robots: {
		index: true,
		follow: true,
	},
	manifest: "/site.webmanifest",
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: "/apple-touch-icon.png",
		other: [
			{ rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
			{ rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
		],
	},
	openGraph: {
		type: "website",
		siteName: "Stardew Valley Companion",
		title: "Stardew Valley Companion",
		description:
			"A free progress tracker for Stardew Valley. Track bundles, friendships, fish, crops, minerals, artifacts, skills, and more across multiple playthroughs.",
		url: siteUrl,
		images: [
			{
				url: "/Site Screenshot.png",
				width: 1200,
				alt: "Stardew Valley Companion dashboard preview",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Stardew Valley Companion",
		description:
			"A free progress tracker for Stardew Valley. Track bundles, friendships, fish, crops, minerals, artifacts, skills, and more across multiple playthroughs.",
		images: ["/Site Screenshot.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${stardewValley.variable} bg-surface dark:bg-surface-dark h-full overflow-hidden antialiased`}
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
