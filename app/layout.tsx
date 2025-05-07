import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Beelingo — WhatsApp Document Translator",
  description: "Beelingo is a WhatsApp bot that helps you translate documents (PDF, DOCX) across languages in just a few seconds. Like a busy bee, it works tirelessly to deliver smooth, accurate translations right to your chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <div className="relative">
          <Header />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
