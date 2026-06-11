import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nitin Hydraulics & Engineering | Construction Machinery Manufacturer",
  description:
    "Leading manufacturer of Hydraulic Tile Press, Fly Ash Brick Making Machines, Concrete Block Machines. Based in Bahadurgarh, Haryana. 13+ years of excellence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}