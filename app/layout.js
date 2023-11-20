import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";

import { GlobalProvider } from "./GlobalProvider";

import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rachtech",
  description: "Mobile store",
};
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <GlobalProvider>
          <Header />
          {children}
          <Footer />
        </GlobalProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
