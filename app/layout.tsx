import type { Metadata } from 'next'
import { Noto_Sans_Bengali } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/ui/ToastProvider'
import ThemeProvider from '@/components/ui/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/home/Footer'

const noto = Noto_Sans_Bengali({
  subsets: ['latin', 'bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Jakir Sir SMART Edu Portal',
  description:
    `Bangladesh's first mobile-first smart education platform for bank and government job preparation.`
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={noto.variable}>
      <body className="min-h-screen bg-background text-textPrimary antialiased">
        <ThemeProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
