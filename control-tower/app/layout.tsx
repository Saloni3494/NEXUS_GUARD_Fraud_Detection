import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Guard | Fraud Intelligence",
  description: "Fraud Intelligence and Digital Payment Security",
  icons: {
    icon: "/icon.png", // Path to your icon in the /public folder
    shortcut: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
