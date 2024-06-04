import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./components/layout/layout";

export const metadata: Metadata = {
  title: "SUNNY",
  description: "SUNNY BackOffice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/Icon/favicon.svg" />
        <body>
          <Layout>{children}</Layout>
        </body>
      </head>
    </html>
  );
}
