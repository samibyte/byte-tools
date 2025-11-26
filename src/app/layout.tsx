import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import { inter } from "./ui/fonts";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Byte Tools",
  description: "A curated marketplace of tiny developer utilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Header */}
        <Navbar />
        {/* Main  */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
