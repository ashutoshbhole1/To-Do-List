import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dr. Sarveshwer Prasad | Cardiac Surgeon",
  description: "Advanced Cardiac Care with Precision & Trust. Book an appointment today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="layout-wrapper">
          <Navbar />
          <main className="main-content" style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
