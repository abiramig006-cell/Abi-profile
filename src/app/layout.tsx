import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selvendran Palanisamy | Embedded Systems & IoT Developer",
  description:
    "Portfolio of Selvendran Palanisamy — Embedded Systems and IoT Developer skilled in Arduino, ESP, RFID, and hardware–software integration.",
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
