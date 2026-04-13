import './globals.css'
import { AppBackground, AppSpotlights } from '@components/background'
import { APP_NAME, FONT_VARIABLES } from '@consts'
import type { Metadata } from 'next'

const faviconPath = '/favicon.png'

export const metadata: Metadata = {
  title: APP_NAME,
  description:
    'Dino Tracker helps freelancers track projects, log hours, and monitor progress in one clean workspace. Stay organized, move faster, and make better decisions with clear stats and insights.',
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
    apple: faviconPath
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${FONT_VARIABLES} antialiased overflow-x-hidden min-h-dvh w-screen font-plus`}>
        {children}

        <AppBackground />
        <AppSpotlights />
      </body>
    </html>
  )
}
