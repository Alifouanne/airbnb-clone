import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb | Vacation rentals, cabins, beach houses, & more",
  description: "Created By Ali Fouanne",
};

/**
 * RootLayout function.
 *
 * This function is a TypeScript-React component that serves as the root layout for the application.
 * It takes in a single prop, 'children', which represents the content to be rendered within the layout.
 * The layout includes a navbar component and the provided 'children' content.
 *
 * @param {Object} props - The props object containing the 'children' prop.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 *
 * @returns {React.ReactNode} - The JSX element representing the root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
