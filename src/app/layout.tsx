import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LenisProvider } from './lenis-provider';
import { Nav } from '@/components/nav/Nav';
import { PremiumShell } from '@/components/shared/PremiumShell';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Devendra Divakar — Full-Stack Developer',
  description:
    'Portfolio of Devendra Divakar, a Full-Stack Developer specializing in web applications and backend systems.',
  keywords: [
    'software engineer',
    'web development',
    'full stack',
    'backend',
    'portfolio',
    'React',
    'Next.js',
  ],
  authors: [{ name: 'Devendra Divakar' }],
  openGraph: {
    title: 'Devendra Divakar — Full-Stack Developer',
    description:
      'Building robust web applications and experimenting with DevOps & Data Science.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devendra Divakar — Full-Stack Developer',
    description:
      'Building robust web applications and experimenting with DevOps & Data Science.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--color-void-black)] text-[var(--color-off-white)]">
        <LenisProvider>
          <PremiumShell />
          <Nav />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}

