import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Date Calculator — Days Between Dates, Add & Subtract Dates",
    template: "%s | datecalculator.site",
  },
  description:
    "Free date calculator. Find the exact number of days, weeks, months, and years between two dates — or add and subtract days, weeks, months, and years from any date. Fast, accurate, and works entirely in your browser.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
