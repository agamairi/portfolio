import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  metadataBase: new URL("https://agamairi.github.io/portfolio"),
  title: "Agam Airi · Mobile Engineer",
  description: "Mobile Application Developer in Toronto. Building native apps, on-device AI, and hardware integrations across iOS, Android, and cross-platform.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Agam Airi · Mobile Engineer", description: "Flutter · Swift · Kotlin · IoT · On-device AI", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Agam Airi · Mobile Engineer" }] },
  twitter: { card: "summary_large_image", title: "Agam Airi · Mobile Engineer", description: "Flutter · Swift · Kotlin · IoT · On-device AI", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
