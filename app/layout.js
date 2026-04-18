import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Barbachos - Ultra Modern Services",
  description: "Next-Gen Service Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="ambient-container">
          <div className="ambient-light light-1"></div>
          <div className="ambient-light light-2"></div>
        </div>
        <AuthProvider>
          <Navbar />
          <main className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', zIndex: 1, position: 'relative' }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
