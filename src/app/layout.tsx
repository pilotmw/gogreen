import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Go Green Resources Limited | Circular Economy Solutions in Malawi",
  description:
    "Go Green Resources Limited develops circular economy solutions in Malawi that transform waste and underused resources into clean energy, recovered materials, sustainable products, and inclusive economic opportunity.",
  keywords: [
    "Circular economy Malawi",
    "Waste management Malawi",
    "Clean energy Malawi",
    "Biogas Malawi",
    "Recycling Malawi",
    "Waste-to-energy",
    "Environmental services Malawi",
    "Green jobs Malawi",
    "Carbon projects Malawi",
    "Resource recovery",
    "Sustainable development Malawi",
  ],
  openGraph: {
    title: "Go Green Resources Limited | Circular Economy Solutions in Malawi",
    description:
      "Transforming waste and underused resources into clean energy, recovered materials, sustainable products, and inclusive economic opportunity in Malawi.",
    type: "website",
    locale: "en_MW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
