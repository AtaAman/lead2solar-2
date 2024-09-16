import { Footer, Header } from "@/components";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Suspense } from "react";
const myFont = localFont({
    src: "../public/HousttelySignature-GOonZ.ttf",
    variable: "--font-house",
});

export const metadata: Metadata = {
    title: "Lead2Solar | Solar Energy Solutions",
    description: "Lead2Solar offers innovative solar energy solutions for homes and businesses. Get a personalized quote for your solar installation and start saving on electricity bills today.",
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-icon.png",
    },
    keywords: ["solar energy", "renewable energy", "solar panels", "solar installation", "energy savings"],
    authors: [{ name: "Lead2Solar Team" }],
    creator: "Lead2Solar",
    publisher: "Lead2Solar",
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        title: "Lead2Solar | Solar Energy Solutions",
        description: "Discover affordable solar energy solutions for your home or business with Lead2Solar. Get a free quote today!",
        url: "https://www.lead2solar.com",
        siteName: "Lead2Solar",
        images: [
            {
                url: "https://www.lead2solar.com/og-image.jpg",
                width: 1200,
                height: 630,
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#2b5797" />
                <meta name="theme-color" content="#ffffff" />
            </head>
            <body data-barba="wrapper" className="">
                <Header />
                {children}
                <Suspense>
                    <Footer />
                </Suspense>
            </body>
        </html>
    );
}
