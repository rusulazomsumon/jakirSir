import type { Metadata } from 'next'
import { Noto_Sans_Bengali } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/ui/ToastProvider'
import ThemeProvider from '@/components/ui/ThemeProvider'

const noto = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Jakir Sir SMART Edu Portal',
  description: `Bangladesh's first mobile-first smart education platform for bank and government job preparation.`
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={noto.variable}>
      <body className="min-h-screen bg-background text-textPrimary antialiased">
        <ThemeProvider>
          <ToastProvider>
            <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-5 md:px-6 lg:px-8 pb-20">
              {/* SearchProvider wraps app to share search state between header and lists */}
              {children}
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
