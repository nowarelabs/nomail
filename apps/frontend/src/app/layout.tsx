import type { Metadata } from "next";
import { Urbanist, Lora, Space_Mono } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
	variable: "--font-urbanist",
	subsets: ["latin"],
});

const lora = Lora({
	variable: "--font-lora",
	subsets: ["latin"],
});

const spaceMono = Space_Mono({
	variable: "--font-space-mono",
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const metadata: Metadata = {
	title: "Nomail",
	description: "Email without all the fluff",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${urbanist.variable} ${lora.variable} ${spaceMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
