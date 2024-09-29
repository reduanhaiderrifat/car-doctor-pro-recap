import localFont from "next/font/local";
import "./globals.css";
import Navber from "@/components/shared/Navber";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "Car Doctor",
    template: "%s |Car Doctor Pro",
  },
  description: "Car repairing workshop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto`}
      >
        <AuthProvider>
          <Navber />
          <div className="min-h-[calc(100vh-288px)]">{children}</div>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
