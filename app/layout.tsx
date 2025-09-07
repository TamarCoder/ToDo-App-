import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import Providers from "./components/Providers/Providers";


export const metadata: Metadata = {
    title: "TodoMaster - Stay Organized",
    description: "Beautiful Todo application built with Next.js and Tailwind CSS",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}