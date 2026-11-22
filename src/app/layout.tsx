import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abirami G — Full Stack Web Development & Artificial Intelligence",
  description:
    "Portfolio of Abirami G, a Computer Science Engineering student building responsive web applications and AI-driven solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-neutral-950 text-white antialiased">{children}</body>
    </html>
  );
}
