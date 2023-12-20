import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Comp/Navbar";
import RegisterModal from "./Comp/Modals/RegisterModal";
import LoginModal from "./Comp/Modals/LoginModal";
// import { AuthProvider, useAuth } from "@/app/context/AuthContext";

import { ToasterProvider } from "./providers/ToasterProvider";
import EventModal from "./Comp/Modals/EventModal";

import SearchModal from "./Comp/Modals/SearchModal";
import ClientOnly from "./Comp/ClientOnly";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yalla",
  description: "Yalla App",
};


// export const sayHello = () => console.log("Hello");
export function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const {user, login} = useAuth();
  // const currentUser = user;


  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <EventModal />
          <RegisterModal />
          <LoginModal />
          <SearchModal /> 
          <Navbar />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}

const WrappedRootLayout: React.FC<{children: React.ReactNode}> = ({ children }) => (

    <RootLayout>{children}</RootLayout>

);

export default WrappedRootLayout;