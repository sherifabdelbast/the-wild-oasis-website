import React from "react";
//google fonts
import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s // The Wild Oasis",
    default: "Welcome // The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel,located in the heart of the Italian Dolomites,surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen  flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 grid">
          <main className="max-w-7xl  mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
