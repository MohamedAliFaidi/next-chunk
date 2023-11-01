import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";

import { GlobalProvider } from "./GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rachtech",
  description: "Mobile store",
};
import { ToastContainer } from "react-toastify";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
