import type { Metadata } from 'next'
import './globals.css'
import { AppBackground } from '@components'
import { FONT_VARIABLES } from '@consts'

export const metadata: Metadata = {
  title: 'Dino Tracker',
  description:
    'Dino Tracker helps freelancers track projects, log hours, and monitor progress in one clean workspace. Stay organized, move faster, and make better decisions with clear stats and insights.',
  icons: {
    icon: '/app-icon.svg',
    shortcut: '/app-icon.svg',
    apple: '/app-icon.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${FONT_VARIABLES} antialiased`}>
        {children}

        <AppBackground />
      </body>
    </html>
  )
}
