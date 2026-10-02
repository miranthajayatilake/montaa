import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--f-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });

export const metadata: Metadata = {
  title: "Montaa — Decision Intelligence",
  description:
    "Simulate the decision before you make it. Montaa models the people, incentives and unknowns around high-stakes decisions, runs game-theoretic simulations, and tells you the best next move — and why.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
