import type { Metadata } from 'next';
import { Playfair_Display, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Obesity and the Politics of Taddeo di Bartolo's Inferno",
  description:
    "Obesity and the Politics of Taddeo di Bartolo's Inferno — a visual critique of the Dominican Order in early fifteenth-century San Gimignano.",
  openGraph: {
    title: "Obesity and the Politics of Taddeo di Bartolo's Inferno",
    description:
      "Taddeo di Bartolo's Last Judgment fresco as political commentary against the Dominican Order.",
    type: 'article',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
