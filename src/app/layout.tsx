import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tic Tac Toe Online | Multi-Themed Strategy Game",
  description:
    "Play the classic Tic Tac Toe game with modern twists and multiple themes. Enjoy pixel-perfect retro arcade, neon cyberpunk, and nature-inspired designs. Challenge friends or practice your strategy skills!",
  keywords: [
    "tic tac toe",
    "noughts and crosses",
    "online strategy game",
    "classic board game",
    "retro arcade game",
    "neon cyberpunk theme",
    "pixel art game",
    "multiplayer tic tac toe",
    "brain training game",
    "quick puzzle game",
    "minimalist strategy",
    "family-friendly game",
    "educational game",
    "JavaScript game",
    "React game",
    "Next.js game",
  ],
  openGraph: {
    title: "Tic Tac Toe Online | Multi-Themed Strategy Game",
    description:
      "Play the classic Tic Tac Toe with modern themes and smooth gameplay. Perfect for quick brain exercises!",
    url: "https://yourdomain.com",
    siteName: "Tic Tac Toe Online",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tic Tac Toe Game Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tic Tac Toe Online | Multi-Themed Strategy Game",
    description:
      "Classic Tic Tac Toe reimagined with multiple visual themes and smooth gameplay",
    images: ["https://yourdomain.com/twitter-card.jpg"],
  },
  alternates: {
    canonical: "https://yourdomain.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
