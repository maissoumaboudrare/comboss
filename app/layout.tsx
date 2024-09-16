import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "./molecules/_components/Header";

import { AuthProvider } from "@/context/AuthContext";
import { CombosProvider } from "@/context/ComboContext";
import { Footer } from "./molecules/_components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import CookieConsent from "./molecules/_components/CookieConsent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caption",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONT_BASE_URL}`),
  title: {
    default: "🔥 Comboss",
    template: "%s | 🔥 Comboss",
  },
  description: "Join the best app of sharing combo.",
  openGraph: {
    title: "🔥 Comboss",
    description: "Join the best app of sharing combo.",
    type: "website",
    locale: "en_US",
    url: `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}`,
    siteName: "Comboss",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          poppins.variable,
          "font-sans h-full bg-background text-foreground"
        )}
      >
        <ToastContainer />
        <AuthProvider>
          <CombosProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              {children}
              <Footer />
            </div>
            <CookieConsent />
          </CombosProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
