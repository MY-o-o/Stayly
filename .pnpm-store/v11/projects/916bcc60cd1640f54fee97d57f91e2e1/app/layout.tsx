import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = { title: "Stayly | Find your next stay", description: "Unique places to stay, curated for your next escape." };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${geist.variable} h-full scroll-smooth`} suppressHydrationWarning><body className="min-h-full font-sans">{children}</body></html>;
}
