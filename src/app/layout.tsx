import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JobFlow - Efficient Job Posting Platform',
  description: 'Create and share job postings efficiently for businesses of all sizes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
      </body>
    </html>
  )
}

