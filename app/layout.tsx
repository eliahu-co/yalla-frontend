import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Comp/Navbar";
import RegisterModal from "./Comp/Modals/RegisterModal";
import LoginModal from "./Comp/Modals/LoginModal";
import { ToasterProvider } from "./providers/ToasterProvider";
import EventModal from "./Comp/Modals/EventModal";
import EventCard from "./Comp/EventCard";
import { volunteerOpportunities } from "./data/volunteerOpportunities";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yalla",
  description: "Yalla App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <EventModal />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
