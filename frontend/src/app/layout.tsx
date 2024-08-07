import "./globals.css";

import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto_Condensed({
	subsets: ["latin"],
	variable: "--font-roboto",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "TaskDone",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={roboto.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
