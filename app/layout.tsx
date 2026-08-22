import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Elvina Infra Pvt Ltd | Architectural Construction Experience',
  description: 'Experience the construction of landmark architecture through an immersive cinematic scroll.',
  keywords: ['Elvina Infra', 'Architecture', 'Construction', 'Cinematic Scrollytelling', 'Engineering'],
  authors: [{ name: 'Elvina Infra Pvt Ltd' }],
  icons: {
    icon: '/images/logo.jpg',
  },
};

export const viewport: Viewport = {
  themeColor: '#071220',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

import FloatingContact from '@/components/FloatingContact';
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#071220] text-white overflow-x-hidden antialiased selection:bg-[#1B4D89] selection:text-white font-sans cursor-none">
        <CustomCursor />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
