import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nasi Empal Balikpapan - Warisan Rasa Otentik",
  description: "Sajian tradisi Balikpapan di setiap suapan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Font Awesome CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}