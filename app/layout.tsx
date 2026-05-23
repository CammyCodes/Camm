import type { Metadata } from 'next';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import SmoothScroll from '@/components/motion/SmoothScroll';
import '@/app/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CammBot — AI that does the boring stuff for your business',
  description: 'Custom AI helpers for trades, property, services and small businesses. Quotes, emails, invoices, leads, admin — handled. Free chat. Free setup. You only pay when it works.',
  openGraph: {
    title: 'CammBot — We build the robot. You get on with the job.',
    description: 'Custom AI workflows, websites and consulting for small businesses. Free until it works.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bg text-ink selection:bg-accent-soft antialiased min-h-screen relative">
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}