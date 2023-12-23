import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LNO - Make Progress',
  description: 'Manage your life with the new LNO framework',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
