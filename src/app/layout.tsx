import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";
import { ptSans } from "./fonts";
import { AppBar } from "./AppBar";

export const metadata: Metadata = {
	title: "Stock Pointer",
	description: "Get the latest stock market news",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={ptSans.className}>
			<body className="w-screen">
				<Providers>
					<AppBar>
						{children}
					</AppBar>
				</Providers>
			</body>
		</html>
	);
}
