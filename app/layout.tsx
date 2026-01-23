import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IEC JKUAT - Innovation and Entrepreneurship Club',
  description: 'Join the Innovation and Entrepreneurship Club at JKUAT. Become a member for 500 KES and access exclusive events, workshops, and networking opportunities.',
  keywords: ['IEC', 'JKUAT', 'Innovation', 'Entrepreneurship', 'Club', 'Membership', 'M-Pesa'],
  authors: [{ name: 'IEC JKUAT' }],
  openGraph: {
    title: 'ICE JKUAT - Innovation and Entrepreneurship Club',
    description: 'Join the Innovation and Entrepreneurship Club at JKUAT',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'ICE JKUAT',
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IEC JKUAT - Innovation and Entrepreneurship Club',
    description: 'Join the Innovation and Entrepreneurship Club at JKUAT',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
