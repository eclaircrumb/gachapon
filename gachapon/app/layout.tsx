import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "theo kiosk",
  description: "theo theo",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/art/raccoon.png`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/art/raccoon.png`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/art/raccoon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
