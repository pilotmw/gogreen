import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Go Green Resources Limited | Circular Economy Solutions in Malawi",
  description:
    "Go Green Resources Limited develops circular economy solutions in Malawi that transform waste and underused resources into clean energy, recovered materials, sustainable products, and inclusive economic opportunity.",
  // CLIENT DECISION PENDING - meta-keywords. Retained from the previous
  // site, not added by the rebuild. Google has not used this tag for
  // ranking since 2009 and Bing treats it as a spam signal, so it does
  // no SEO work here. It is harmless but also does nothing.
  //
  // Note this lives in the ROOT layout, so it applies site-wide, not just
  // to the homepage as the brief assumed. Removing it here would drop it
  // from every page.
  //
  // RECOMMENDATION: delete this block. To keep it, do nothing - the only
  // cost of leaving it is a slightly untidy head. Do not spend effort
  // curating the wording unless the client asks for it, since no major
  // engine will read it.
  //
  // The <title> and description above are what actually matter for search
  // and social, and both are handled properly. openGraph below is the
  // part that genuinely affects how links appear when shared.
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
