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
        <div className="container mx-auto mt-2 p-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-60">
          {volunteerOpportunities.map((opportunity, index) => (
            <Link href={`/events/${index}`} key={index}>
            <EventCard {...opportunity}/>
            </Link>
          ))}
        </div>
        </div>
        {children}
      </body>
    </html>
  );
}
