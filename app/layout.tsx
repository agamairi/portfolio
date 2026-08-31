import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://brief-site.agam-airi.chatgpt.site"),
  title: "Agam Airi — Mobile Engineer",
  description: "Interactive portfolio of Agam Airi, a Toronto-based Mobile Application Developer, iOS Developer, and Software Engineer building IoT and on-device AI products.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Agam Airi — Mobile Engineer", description: "Flutter · Swift · Kotlin · IoT · On-device AI", type: "website", images: [{ url: "https://brief-site.agam-airi.chatgpt.site/og.png", width: 1200, height: 630, alt: "Agam Airi — Mobile Engineer" }] },
  twitter: { card: "summary_large_image", title: "Agam Airi — Mobile Engineer", description: "Flutter · Swift · Kotlin · IoT · On-device AI", images: ["https://brief-site.agam-airi.chatgpt.site/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
